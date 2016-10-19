var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');
var Comment = require('./../../../models/comment');
var User = require('./../../../models/user');
var _db = require('./../../../models/_db');

var router = express.Router();

//user checks to see if new message
router.post('/new/', function (req, res, next) {
	console.log("DISCOVERY/NEW HIT:", req.body);
	var userId = req.user.id;
	var rawLatitude = req.body.location.coords.latitude;
	var rawLongitude = req.body.location.coords.longitude;

	var discoveredLatitude = +rawLatitude.toFixed(4);
	var discoveredLongitude = +rawLongitude.toFixed(4); 

	console.log("Request received from user with id:", userId, "User Latitude:", rawLatitude, "User Longitude:", rawLongitude);

	Message.findOne({where:
		{
			latitude: {
				$gte: discoveredLatitude - .0005,
				$lte: discoveredLatitude + .0005
			},
			longitude: {
				$gte: discoveredLongitude - .0005,
				$lte: discoveredLongitude + .0005
			}, authorId: {
				$ne: userId
			}, deletedByUser: false
		}
	})
	.then(function(message){
		if (message === null) {
			console.log("No matching message for user with id:", userId);
			return res.json({id: null});
		} else {
			Discovery.findOne({where:
				{
					messageId: message.id
				}
			})
			.then(function(discovery){
				if (discovery !== null) {
					console.log(`There was a matching message for user with id: ${userId}, but the user had already discovered it.`);
					return res.json({id: null});
				} else {
					Discovery.create({
						discovererId: userId,
						messageId: message.id
					})
					.then(function(newDiscovery){
						return Discovery.findOne({where:
							{
								id: newDiscovery.id
							},
							include: 
							{
								model: Message,
								as: "message",
								include: 
								[	
									{
									model: User,
									as: "author"
									},
								]
							}	
						})
					})
					.then(function(sentDiscovery){
					console.log("New discovery created for request from user with id:", userId);
					res.json(sentDiscovery);
					})

				}
			})
		}
	}).catch(next);
});

router.get('/user/:id', function (req, res, next) {
	var currentUserId = req.params.id;

	Discovery.findAll({where: 
		{
			discovererId: currentUserId,
			hidden: false
		},
		include: 
		{
			model: Message, 
			as: "message", 
			include: 
			[
				{
				model: User, 
				as: "author"
				},
				{
				model: Comment,
				as: "comment",
				include:
					{
					model: User,
					as: "user"
					}
				}
			]
		}
	})
	.then(function (discoveredMessages) {
		res.send(discoveredMessages);
	}).catch(next);
});

//mark a discovered message as unread
router.put('/unread/:messageId', function (req, res, next) {
	// id is the id of the message of the discovery, not the discovery itself
	// not conventional. Think of rewriting async code in a later version to fix this
	// would require saving the discovery ids on the client -- worth it?
	var messageId = req.params.messageId;
	var discovererId = req.user.id;
	Discovery.findOne({where: 
		{
			messageId: messageId,
			discovererId: discovererId
		}
	})
	.then(function (discovery) {
		if (discovery.unread === true) {
			console.log("DISCOVERY had not already been yet marked as unread. MARKING AS UNREAD, ID:", discovery.id);
			return discovery.update({unread: false});
		} else {
			console.log("Error on front-end? DISCOVERY had already been marked as UNREAD. ID:", discovery.id);
			return null;
		}
	})
	.then(function (discovery) {
		return res.json({discovery});
	}).catch(next);

});

//hide message (users has decided to delete message. we keep the discovery in the database, but to user it will appear hidden)
router.put('/hide/:messageId', function (req, res, next) {
	//currently, id must be the id of the discovery, not the message
	//see note about above route
	var hiddenMessageId = req.params.messageId;
	var discovererId = req.user.id;
	Discovery.findOne({where: 
		{
			messageId: hiddenMessageId,
			discovererId: discovererId
		}
	})
	.then(function (discovery) {
		return discovery.update({hidden: true});
	})
	.then(function (discovery) { 
		console.log("USER WITH ID:", req.user.id, "HIDING DISCOVERED DISCOVERY WITH ID:", discovery.id);
		res.json({discovery});
	}).catch(next);
});

//report message -- allow users to flag a message as inappropriate
//consider adding another table called reports. that way, people can submit a reason why they're reporting a message, and we can keep track of it
router.put('/report/:id', function (req, res, next) {
	var reportedMessageId = req.params.id;
	Discovery.findOne({where: 
		{id: reportedMessageId}
	})
	.then(function (message) {
		return message.update({reported: true})
	})
	.then(function (message) {
		res.json({message});
	}).catch(next);
});

router.get('/', function (req, res, next) {
	Discovery.findAll()
	.then(function (discoveries) {
		res.json(discoveries);
	})
})

module.exports = router;