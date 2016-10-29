var express = require('express');
var Promise = require('bluebird');

var WallPostLike = require('./../../../models/wall-post-like');

var router = express.Router();

router.post('/:id', function (req, res, next) {
	var userId;
	var wallpostId = req.params.id;
	
	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		return sendStatus(401);
	}

	//should make sure that the like doesn't already exist?
	WallPostLike.create({
		userId: userId,
		wallpostId: wallpostId
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "LIKED WALL POST WITH ID", wallpostId);
		res.json(like);
	}).catch(next);
});

router.delete('/:id', function (req, res, next) {
	var userId;
	var wallpostId = req.params.id;

	//delete later
	if (req.user) {
		userId = req.user.id;
	} else {
		return sendStatus(401);
	}

	WallPostLike.findOne({where: 
		{
			userId: userId,
			wallpostId: wallpostId
		}
	})
	.then(function (like) {
		return like.destroy();
	})
	.then(function (like) {
		console.log("USER WITH ID", userId, "UNLIKED WALL POST WITH ID", wallpostId);
		res.json({deleted: true});
	}).catch(next);
});

module.exports = router;