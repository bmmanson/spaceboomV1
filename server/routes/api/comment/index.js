var express = require('express');
var Promise = require('bluebird');

var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');
var User = require('./../../../models/user');
var Comment = require('./../../../models/comment');
var CommentLike = require('./../../../models/comment-like');
var _db = require('./../../../models/_db');

var router = express.Router();

router.post('/message/:id', function (req, res, next) {
	var text = req.body.text;
	var authorId = req.user.id;
	var messageId = req.params.id;

	console.log("POST COMMENT MESSAGE ROUTE HIT. SIMULATING DOWNLOAD");
	for (var i=0; i<1000000000; ++i) {
		var green = "green";
	};
	console.log("AFTER FOR LOOP");

	Comment.create({
		text: text,
		authorId: authorId,
		messageId: messageId
	})
	.then(function (comment) {
		console.log("ID OF NEW COMMENT IS THIS:", comment.id);
		return Comment.findOne({
			where: 
			{
				id: 
				comment.id
			},
			include: 
			{
				model: User,
				as: "author"
			}	
		})
	})
	.then(function (newComment) {
		console.log("NEW COMMENT", newComment);
		console.log("USER WITH ID", authorId, "CREATED NEW COMMENT");
		res.json(newComment);
	}).catch(next);
});

router.get('/message/:id', function (req, res, next) {
	var userId;
	var messageId = req.params.id;

	if (req.user) {
		userId = req.user.id;
	} else {
		return res.sendStatus(401);
	}

	// for testing spinner
	console.log("GET COMMENT MESSAGE ROUTE HIT. SIMULATING DOWNLOAD");
	for (var i=0; i<1000000000; ++i) {
		var green = "green";
	};
	console.log("AFTER FOR LOOP");

	Comment.findAll({
		where: 
			{
				messageId: messageId,
				deletedByUser: {
					$not: true
				}
			},
		include: 
			{
				model: User,
				as: "author"
			}
	})
	.then(function (comments) {
		var promisesToCheckIfUserLikedComment = [];
		comments.forEach(function (comment) {
			promisesToCheckIfUserLikedComment.push(
				CommentLike.findOne({where: 
					{
						userId: userId,
						commentId: comment.id
					}
				})
				.then(function (result) {
					if (result !== null) {
						return {
							isLikedByCurrentUser: true,
							data: comment
						};
					} else {
						return {
							isLikedByCurrentUser: false,
							data: comment
						};
					}
				})
			)
		})
		return Promise.all(promisesToCheckIfUserLikedComment); 
	})
	.then(function (comments) {
		res.json(comments);
	}).catch(next);
});

router.post('/like/:id', function (req, res, next) {
	var userId;
	var commentId = req.params.id;
	
	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		return sendStatus(401);
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
		return sendStatus(401);
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
		console.log("COMMENT WITH ID", deletedMessageId, "DELETED BY USER");
		res.json({comment});
	}).catch(next);
});

module.exports = router;