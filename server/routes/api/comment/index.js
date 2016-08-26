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
})

module.exports = router;