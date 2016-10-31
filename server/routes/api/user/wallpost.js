var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var User = require('./../../../models/user');
var UserProfile = require('./../../../models/user-profile');
var WallPost = require('./../../../models/wall-post');
var WallPostLike = require('./../../../models/wall-post-like');

router.use('/like', require('./like'));

router.get('/:id', function (req, res, next) {
	var userId = req.user.id;
	var profileId = req.params.id;

	WallPost.findAll({
		//get all wall posts which are comments for 
		//the profile with id of profileId
		where: 
		{
			userId: profileId,
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
					//if a like for this message exists, return true
					if (result !== null) {
						return {
							isLikedByCurrentUser: true,
							data: wallpost
						}
					// else, false
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
		console.log("USER WITH ID:", req.user.id, "CREATED NEW WALL POST ON ID:", profileId);
		res.json(wallpost);
	}).catch(next);
});

router.put('/deletedByUser/:id', function (req, res, next) {
	var wallPostId = req.params.id;
	WallPost.findById(wallPostId)
	.then(function (wallPost) {
		return wallPost.update({deletedByUser: true});
	})
	.then(function (wallPost) {
		return res.json({comment: wallPost});
	});
});

module.exports = router;