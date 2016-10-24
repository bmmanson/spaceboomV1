var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var User = require('./../../../models/user');
var UserProfile = require('./../../../models/user-profile');
var WallPost = require('./../../../models/wall-post');
var WallPostLike = require('./../../../models/wall-post-like');
var Message = require('./../../../models/message');

router.get('/:id', function (req, res, next) {
	var userId = req.params.id;

	WallPost.findAll({
		where: 
		{
			userId: userId,
			deletedByUser: {
				$not: true
			}
		},
			include: 
		{
			model: User,
			as: "author"
		}
	}).then(function (wallposts) {
		var promisesToCheckIfUserLikedWallPost = [];
		wallposts.forEach(function (wallpost) {
			promisesToCheckIfUserLikedWallPost.push(
				WallPostLike.findOne({where:
					{
						userId: userId,
						wallpostId: wallpost.id
					}
				})
				.then(function (result) {
					if (result !== null) {
						return {
							isLikedByCurrentUser: true,
							data: wallpost
						}
					} else {
						return {
							isLikedByCurrentUser: false,
							data: wallpost
						}
					}
				})
			)
		})
		return Promise.all(promisesToCheckIfUserLikedWallPost);
	})
	.then(function (wallposts) {
		res.json(wallposts);
	}).catch(next);
});

router.post('/:userId', function (req, res, next) {
	var authorId = req.user.id || req.body.authorId;
	var profileId = req.params.userId;
	var text = req.body.text;
	WallPost.create({
		text: text,
		authorId: authorId,
		userId: profileId
	})
	.then(function (wallpost) {
		return WallPost.findOne({where: 
			{
				id: wallpost.id,
			},
			include: 
			{
				model: User,
				as: "author"
			}
		});
	})
	.then(function (wallpost) {
		console.log("USER WITH ID:", req.user.id, "CREATED NEW WALLPOST ON ID:", profileId);
		res.json(wallpost);
	}).catch(next);
});

module.exports = router;