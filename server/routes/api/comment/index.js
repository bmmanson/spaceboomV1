var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');
var User = require('./../../../models/user');
var Comment = require('./../../../models/comment');
var CommentLike = require('./../../../models/comment-like');
var _db = require('./../../../models/_db');

var router = express.Router();

router.get('/message/:id', function (req, res, next) {
	var messageId = req.params.id;
	Comment.findAll({where: 
		{
			messageId: messageId
		}
	})
	.then(function (comments) {
		res.json(comments);
	})
});

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

router.post('/like/:id', function (req, res, next) {
	var userId;
	var commentId = req.params.id;
	
	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		userId = req.body.id;
	}

	//not safe -- first should make sure that the like doesn't already exist
	CommentLike.create({
		userId: userId,
		commentId: commentId
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "LIKED COMMENT WITH ID", commentId);
		res.json(like);
	}).catch(next);
});

router.delete('/like/:id', function (req, res, next) {
	var userId;
	var commentId = req.params.id;

	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		userId = req.body.id;
	}

	CommentLike.findOne({where: 
		{
			userId: userId,
			commentId: commentId
		}
	})
	.then(function (like) {
		like.destroy();
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "UNLIKED COMMENT WITH ID", commentId);
		res.json({deleted: true});
	}).catch(next);
});

//hide message (users has decided to delete message. we keep the discovery in the database, but to user it will appear hidden)
router.put('/deletedByUser/:id', function (req, res, next) {
//id must be the id of the discovery, not the message
	var deletedMessageId = req.params.id;
	Comment.findOne({where: 
		{id: deletedMessageId}
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