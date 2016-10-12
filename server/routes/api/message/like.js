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

router.get('/:id', function (req, res, next) {
	var userId;
	var messageId = req.params.id;
	
	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		return sendStatus(401);
	}

	Message.findById(messageId)
	.then(function (message) {
		MessageLike.findOne({
			where:
			{
				userId: userId,
				messageId: messageId
			}
		})
		.then(function (messagelike) {
			var liked;
			if (messagelike) {
				liked = true;
			} else {
				liked = false;
			}
			res.json({
				numberOfLikes: message.numberOfLikes,
				liked: liked
			})
		})
	}).catch(next);
});

router.post('/:id', function (req, res, next) {
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
		messageId: messageId
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "LIKED MESSAGE WITH ID", messageId);
		return like;
	})
	.then(function (like) {
		return MessageLike.findAll({
			where:
			{
				messageId: messageId
			}
		})
	})
	.then(function (likes) {
		res.json({numberOfLikes: likes.length})
	}).catch(next);
});

router.delete('/:id', function (req, res, next) {
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
			messageId: messageId
		}
	})
	.then(function (like) {
		return like.destroy();
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "UNLIKED MESSAGE WITH ID", messageId);
		return like;
	})
	.then(function (like) {
		return MessageLike.findAll({
			where:
			{
				messageId: messageId
			}
		})
	})
	.then(function (likes) {
		res.json({numberOfLikes: likes.length});
	}).catch(next);
});

module.exports = router;
