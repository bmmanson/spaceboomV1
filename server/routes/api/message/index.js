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

var env = require('./../../../env');
var utils = require('./utils');

router.use('/report', require('./report'));
router.use('/like', require('./like'));

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

router.get('/timesDiscovered/:id', function (req, res, next) {
	var messageId = req.params.id;
	Message.findById(messageId)
	.then(function (message) {
		res.json({timesDiscovered: message.timesDiscovered});
	}).catch(next);
});

//get all messages (for admin console)
router.get('/', function (req, res, next) {
	Message.findAll({include: {model: User, as: "author"}})
	.then(function(messages){
		res.json(messages);
	}).catch(next);
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

//post message -- when user submits a message
router.post('/', function (req, res, next) {
	var newMessage = {
		text: req.body.text,
		authorId: req.user.id,
		latitude: parseFloat(req.body.latitude),
		longitude: parseFloat(req.body.longitude),
		locationName: null,
		city: null
	}

	var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
		+ newMessage.latitude + ',' + newMessage.longitude + 
		'&key=' + process.env.GOOGLE_API_KEY;

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

router.get('/locationName/', function (req, res, next) {
	var latitude = parseFloat(req.query.latitude);
	var longitude = parseFloat(req.query.longitude);

	var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' 
		+ latitude + ',' 
		+ longitude + 
		'&key=' + process.env.GOOGLE_API_KEY;

	request(url, function (error, resGoogle, body) {

		var parsedBody = JSON.parse(body);
		var locationName = utils.findLocationName(parsedBody);

		if (!error && resGoogle.statusCode == 200) {
			res.json({locationName: locationName});
			console.log("USER WITH ID:", req.user.id, 
				"REQUESTS LOCATION NAME WITH LAT:", latitude, 
				"LONG:", longitude, 
				"locationName:", locationName);
		}
	})
})

//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});


module.exports = router;

