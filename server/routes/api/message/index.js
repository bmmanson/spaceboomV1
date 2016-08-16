var express = require('express');
var Message = require('./../../../models/message');
var User = require('./../../../models/user');
var Discovery = require('./../../../models/discovery');

var router = express.Router();

//get messages for user
router.get('/user/:id', function (req, res, next) {
	var currentUserId = req.params.id;
	//should get all discovered messages and all sent messages when app starts up
	Message.findAll({where: 
		{
			authorId: currentUserId
		}, 
		include: {model: User, as: "author"}
	})
	.then(function (sentMessages) {
		Discovery.findAll({where: 
		{
			discovererId: currentUserId
		},
		include: {model: Message, 
					as: "message", 
					include: {
						model: User, 
						as: "author"}
					}
	})
		//still need to include the actual info for messages, authors and discoverers, and not just the id numbers
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

//edit message (only user who posted a message is permitted to change its body)
router.put('/:id', function (req, res, next) {

});

//post message -- when user submits a message
router.post('/', function (req, res, next) {
//may need to contact another API which will give names to locations based on latitude and longitude
});

//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});


module.exports = router;

