var express = require('express');
var Promise = require('bluebird');
var request = require('request');
var router = express.Router();

var Message = require('./../../../models/message');
var MessageLike = require('./../../../models/message-like');
var User = require('./../../../models/user');
var Discovery = require('./../../../models/discovery');
var Comment = require('./../../../models/comment');
var CommentLike = require('./../../../models/comment-like');

var googleCredentials = require('./../../../../google-credentials');
var utils = require('./utils');

//get messages by user
router.get('/user/:id', function (req, res, next) {
	var currentUserId = req.params.id;
	Message.findAll({where: 
		{
			authorId: currentUserId,
			deletedByUser: false
		}, 
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
	})
	.then(function (sentMessages) {
		res.json({
			sentMessages
		});
	}).catch(next);
});

//get all messages (for admin console)
router.get('/', function (req, res, next) {
	Message.findAll({include: {model: User, as: "author"}})
	.then(function(messages){
		res.json(messages);
	}).catch(next);
});

//partial redundancy with discovery routes -- need to consolidate
router.put('/report/:id', function (req, res, next) {
	var messageId = req.params.id;

	// if (!req.user) {
	// 	return res.sendStatus(401);
	// }

	Discovery.findOne({where:
		{
			id: messageId
		}
	})
	.then(function (discovery) {
		return message.update({reported: true});
	})
	.then(function (discovery) {
		console.log("Message with ID", 
			message.id, 
			"reported by user with ID"); 
			//req.user.id
			//);
		return res.json(message);
	});
});

router.put('/cancelReport/:id', function (req, res, next) {
	var messageId = req.params.id;

	// if (!req.user) {
	// 	return res.sendStatus(401);
	// }

	Message.findOne({where:
		{
			id: messageId
		}
	})
	.then(function (message) {
		return message.update({reported: false});
	})
	.then(function (message) {
		console.log("Message with ID", 
			message.id, 
			"reported by user with ID"); 
			//req.user.id
			//);
		return res.json(message);
	});
});

//hit this route when a user chooses to delete a message. will remain in database, but will no longer be accessible to users
router.put('/hide/:id', function (req, res, next) {
	var messageId = req.params.id;

	Message.findOne({where:
		{
			id: messageId
		}
	})
	.then(function(message){
		return message.update({deletedByUser: true});
	})
	.then(function(message){
		console.log("HIDING SENT MESSAGE", message);
		res.json(message);
	}).catch(next);
})

router.put('/:id', function (req, res, next) {
//edit message (only user who posted the message/an admin is permitted to change its body)
});

router.post('/like/:id', function (req, res, next) {
	var userId;
	var messageId = req.params.id;
	
	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		return sendStatus(401);
	}

	//should make sure that like doesn't already exist?
	MessageLike.create({
		userId: userId,
		MessageId: MessageId
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "LIKED MESSAGE WITH ID", messageId);
		res.json(like);
	}).catch(next);
});

router.delete('/like/:id', function (req, res, next) {
	var userId;
	var messageId = req.params.id;

	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		return sendStatus(401);
	}

	MessageLike.findOne({where: 
		{
			userId: userId,
			MessageId: MessageId
		}
	})
	.then(function (like) {
		like.destroy();
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "UNLIKED MESSAGE WITH ID", messageId);
		res.json({deleted: true});
	}).catch(next);
});

//post message -- when user submits a message
router.post('/', function (req, res, next) {

	var newMessage = {
		text: req.body.text,
		authorId: req.body.authorId || req.user.id,
		latitude: parseFloat(req.body.latitude),
		longitude: parseFloat(req.body.longitude),
		locationName: null,
		city: null
	}

	var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
		+ newMessage.latitude + ',' + newMessage.longitude + 
		'&key=' + googleCredentials.APIKEY;

	request(url, function (error, resGoogle, body) {

		var parsedBody = JSON.parse(body);
		newMessage.locationName = utils.findLocationName(parsedBody);
		newMessage.city = utils.findCity(parsedBody);

		if (!error && resGoogle.statusCode == 200) {

			Message.create(newMessage)
			.then(function (message) {
				return Message.findOne({where:
				{
					id: message.id
				},
				include: {model: User, as: "author"}
				})
			})
			.then(function (message) {
			console.log("Added new Message from user with ID:", newMessage.authorId, newMessage);
				res.send(message);
			}).catch(next);
		}
	})

});

//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});


module.exports = router;

