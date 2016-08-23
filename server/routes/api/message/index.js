var express = require('express');
var Promise = require('bluebird');
var request = require('request');
var router = express.Router();

var Message = require('./../../../models/message');
var User = require('./../../../models/user');
var Discovery = require('./../../../models/discovery');

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
		include: {model: User, as: "author"}
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

//hit this route when a user chooses to delete a message. will remain in database, but will no longer be accessible to users
router.put('/hide/:id', function (req, res, next) {
	var messageId = req.params.id;

	console.log("REQ.PARAMS", req.params);
	console.log("REQ.BODY", req.body);

	Message.findOne({where:
		{
			id: messageId
		}
	})
	.then(function(message){
		return message.update({deletedByUser: true})
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
//may need to contact another API which will give names to locations based on latitude and longitude

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
		
		console.log(body);

		var parsedBody = JSON.parse(body);
		newMessage.locationName = utils.findLocationName(parsedBody);
		newMessage.city = utils.findCity(parsedBody);

		if (!error && resGoogle.statusCode == 200) {
			console.log("MESSAGE RECEIVED. CURRENT newMessage:", newMessage);

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
			console.log("New message created by user in", newMessage.city, ". Sending to client:", newMessage.authorId);
				res.send(message);
			}).catch(next);
		}
	})

});

//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});


module.exports = router;

