var express = require('express');
var Promise = require('bluebird');

var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');
var User = require('./../../../models/user');
var Comment = require('./../../../models/comment');
var CommentLike = require('./../../../models/comment-like');
var _db = require('./../../../models/_db');

var router = express.Router();

router.use('/like', require('./like'));

router.post('/message/:id', function (req, res, next) {
	var text = req.body.text;
	var authorId = req.user.id;
	var messageId = req.params.id;

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
				id: comment.id
			},
			include: 
			{
				model: User,
				as: "author"
			}	
		})
	})
	.then(function (newComment) {
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