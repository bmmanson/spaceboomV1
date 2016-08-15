var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');
var User = require('./../../../models/user');
var _db = require('./../../../models/_db');

var router = express.Router();

//user checks to see if new message
router.post('/new', function (req, res, next) {
//it makes sense for this to be a post request -- if there's a match, we're creating a new row in the discovery table
	
//1st
//lat : 40.730395
//long : -74.000119

//2nd
//lat : 40.730761
//long : -74.000773

//currently accurate enough to find a message within a half NYC block radius

	discoveredLatitude = +req.body.latitude.toFixed(4);
	discoveredLongitude = +req.body.longitude.toFixed(4); 

	var userId = req.body.userId;

	console.log("Request received from user with id:", userId, ". Body of message:", req.body);

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
			}
		}
	})
	.then(function(message){
		if (message === null) {
			console.log("No matching message for user with id:", userId);
			return res.json({noMessageFound: true});
		} else {
			Discovery.findOne({where:
				{messageId: message.id}
			})
			.then(function(discovery){
				if (discovery !== null) {
					console.log(`There was a matching message for user with id: ${userId}, but the user had already discovered it.`);
					return res.json({noMessageFound: true});
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
							include: {
								model: Message,
								as: "message",
								include: {
									model: User,
									as: "author"}
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

//mark a discovered message as unread
router.put('/unread/:id', function (req, res, next) {
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
			res.send({alreadyRead: true});
		}
	})
	.then(function (message) {
		res.json({message});
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