var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');

var router = express.Router();



//get messages for user
router.get('/user/:id', function (req, res, next) {
	var currentUserId = req.body.userId;
	//should get all discovered messages and all sent messages when app starts up

	//if a sent message, adds a currentUser property with value true

	//if a discovered message, adds a currentUser property with value false
});

//report message -- allow users to report an inappropriate message
router.get('/report', function (req, res, next) {

});

//get all messages (for admin console)
router.get('/', function (req, res, next) {
	Message.findAll()
	.then(function(messages){
		res.json(messages);
	})
});

//post message -- when user submits a message
router.post('/', function (req, res, next) {

});



//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});

//edit message (user who posted a message can change its body)
router.put('/:id', function (req, res, next) {

});

module.exports = router;

