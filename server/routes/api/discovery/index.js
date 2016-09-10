var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');
var User = require('./../../../models/user');
var _db = require('./../../../models/_db');

var router = express.Router();

//user checks to see if new message
router.post('/new', function (req, res, next) {
//it makes sense for this to be a post request -- if there's a match, we're creating a new instance/row in the discovery table
	//1st
	//lat : 40.730395
	//long : -74.000119

	//2nd
	//lat : 40.730761
	//long : -74.000773

	//currently accurate enough to find a message within a half NYC block radius. Radius is so large because getCurrentPosition runs so infrequently.

	var userId = req.query.userId;
	var discoveredLatitude = parseFloat(req.query.latitude);
	var discoveredLongitude = parseFloat(req.query.longitude);

	discoveredLatitude = +discoveredLatitude.toFixed(4);
	discoveredLongitude = +discoveredLongitude.toFixed(4); 

	console.log("Request received from user with id:", userId, "User Latitude:", parseFloat(req.query.latitude), "User Longitude:", parseFloat(req.query.longitude));

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
			//I think I can delete everything from here
			Discovery.findOne({where:
				{messageId: message.id}
			})
			.then(function(discovery){
				if (discovery !== null) {
					console.log(`There was a matching message for user with id: ${userId}, but the user had already discovered it.`);
					return res.json({id: null});
				} else {
			//to here
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
									{
									model: Comment,
									as: "comment",
									include:
										{
										model: User,
										as: "author"
										}
									}
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
router.put('/unread/:id', function (req, res, next) {
	console.log("THE ID:", req.params.id);
	//id must be the id of the discovery, not the message
	var readMessageId = req.params.id;
	Discovery.findOne({where: 
		{id: readMessageId}
	})
	.then(function (message) {
		if (message.unread === true) {
			return message.update({unread: false});
		} else {
			//perhaps something better to send to client if the message was already marked unread?
			console.log("DISCOVERED MESSAGE was already marked as UNREAD. ID:", message.id);
			res.send({message: 
				{id: null}
			});
		}
	})
	.then(function (message) {
		console.log("DISCOVERED MESSAGE marked as UNREAD. ID:", message.id);
		return res.json({message});
	}).catch(next);

});

//hide message (users has decided to delete message. we keep the discovery in the database, but to user it will appear hidden)
router.put('/hide/:id', function (req, res, next) {
//id must be the id of the discovery, not the message
	var hiddenMessageId = req.params.id;
	Discovery.findOne({where: 
		{id: hiddenMessageId}
	})
	.then(function (message) {
		return message.update({hidden: true})
	})
	.then(function (message) {
		console.log("HIDING DISCOVERED MESSAGE", message);
		res.json({message});
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