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

	console.log("WALL POST ROUTE HIT. SIMULATING DOWNLOAD");
	for (var i=0; i<1000000000; ++i) {
		var green = "green";
	};
	console.log("AFTER FOR LOOP");

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

module.exports = router;