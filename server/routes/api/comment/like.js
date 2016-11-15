var express = require('express');
var Promise = require('bluebird');

var Message = require('./../../../models/message');
var Comment = require('./../../../models/comment');
var CommentLike = require('./../../../models/comment-like');

var router = express.Router();

router.post('/:id', function (req, res, next) {
	var userId;
	var commentId = req.params.id;
	
	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		return sendStatus(401);
	}

	//should make sure that the like doesn't already exist
	CommentLike.create({
		userId: userId,
		commentId: commentId
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "LIKED COMMENT WITH ID", commentId);
		res.json(like);
	}).catch(next);
});

router.delete('/:id', function (req, res, next) {
	var userId;
	var commentId = req.params.id;

	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		return sendStatus(401);
	}

	CommentLike.findOne({where: 
		{
			userId: userId,
			commentId: commentId
		}
	})
	.then(function (like) {
		return like.destroy();
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "UNLIKED COMMENT WITH ID", commentId);
		res.json({deleted: true});
	}).catch(next);
});

module.exports = router;