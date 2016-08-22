var express = require('express');
var Message = require('./../../../models/message');
var User = require('./../../../models/user');
var Discovery = require('./../../../models/discovery');

var router = express.Router();

//get messages for user
router.get('/user/:id', function (req, res, next) {
	var currentUserId = req.params.id;
	//refactor to use bluebird / Promise.all / .spread
	Message.findAll({where: 
		{
			authorId: currentUserId,
			deletedByUser: false
		}, 
		include: {model: User, as: "author"}
	})
	.then(function (sentMessages) {
		Discovery.findAll({where: 
		{
			discovererId: currentUserId,
			hidden: false
		},
		include: {model: Message, 
					as: "message", 
					include: {
						model: User, 
						as: "author"}
					}
	})
		.then(function (discoveredMessages) {
			res.json({
				sentMessages, 
				discoveredMessages
			});
		})
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
		locationName: req.body.locationName,
		city: req.body.city
	}

	Message.create(newMessage)
	.then(function (message) {
		Message.findOne({where:
			{
				id: message.id
			},
			include: {model: User, as: "author"}
		})
		.then(function (message) {
			//update this in the future if city does not come from req.body
			console.log("New message created by user in", req.body.city, ". Sending to client:", req.user.id);
			res.send(message);
		})
	})

	.catch(next);

});

//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});


module.exports = router;

