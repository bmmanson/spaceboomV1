var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');
var User = require('./../../../models/user');
var Comment = require('./../../../models/comment');
var _db = require('./../../../models/_db');

var router = express.Router();

router.post('/message/:id', function (req, res, next) {
	var text = req.body.text;
	var authorId = req.body.authorId;
	var messageId = req.params.id;

	Comment.create({
		text: text,
		authorId: authorId,
		messageId: messageId
	})
	.then(function (comment) {
		res.json(comment);
	}).catch(next);
});

//hide message (users has decided to delete message. we keep the discovery in the database, but to user it will appear hidden)
router.put('/deletedByUser/:id', function (req, res, next) {
//id must be the id of the discovery, not the message
	var hiddenMessageId = req.params.id;
	Comment.findOne({where: 
		{id: hiddenMessageId}
	})
	.then(function (comment) {
		return comment.update({deletedByUser: true})
	})
	.then(function (comment) {
		console.log("DELETING COMMENT", comment);
		res.json({comment});
	}).catch(next);
});

module.exports = router;