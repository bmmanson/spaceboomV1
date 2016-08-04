var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');

var router = express.Router();

//user checks to see if new message
router.post('/new', function (req, res, next) {
//it's a post -- if there's a match, we're creating a new row in the discovery table
});

//mark a discovered message as unread
router.put('/unread/:id', function (req, res, next) {
//id must be the id of the discovery, not the message
	var readMessageId = req.params.id;
	Discovery.findOne({where: 
		{id: readMessageId}
	})
	.then(function (message) {
		return message.update({unread: false})
	})
	.then(function (message) {
		res.json({message});
	}).catch(next);

});

//hide message (users has decided to delete message. we keep the discovery in the database, but to user it will appear hidden)
router.put('/hide/:id', function (req, res, next) {
//id must be the id of the discovery, not the message

});

//report message -- allow users to flag a message as  inappropriate
router.put('/report/:id', function (req, res, next) {

});

router.get('/', function (req, res, next) {
	Discovery.findAll()
	.then(function (discoveries) {
		res.json(discoveries);
	})
})

module.exports = router;