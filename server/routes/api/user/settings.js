var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var User = require('./../../../models/user');
var UserProfile = require('./../../../models/user-profile');

router.put('/username/:id', function (req, res, next) {
	var username = req.body.username;
	var userId = req.params.id;

	User.findById(userId)
	.then(function (user) {
		return user.update({username: username});
	})
	.then(function (user) {
		res.send(user);
	})
});

router.put('/toggleNameDisplayed/:id', function (req, res, next) {
	var val = req.body.displayRealIdentity;
	var userId = req.params.id;
	
	User.findById(userId)
	.then(function (user) {
		return user.update({displayRealIdentity: val})
	})
	.then(function (user) {
		res.send(user);
	})
});

router.put('/aboutMe/:id', function (req, res, next) {
	var text = req.body.text;
	var userId = req.params.id;

	UserProfile.findOne({
		where: 
		{
			userId: userId
		}
	})
	.then(function (userProfile) {
		return userProfile.update({aboutMe: text});
	})
	.then(function (userProfile) {
		res.send(userProfile);
	})
});

module.exports = router;