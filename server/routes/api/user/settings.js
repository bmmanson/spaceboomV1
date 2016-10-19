var express = require('express');
var Promise = require('bluebird');
var swearjar = require('swearjar');
swearjar.loadBadWords('./../../../node_modules/swearjar/lib/config/en_US.json');
var router = express.Router();
var User = require('./../../../models/user');
var UserProfile = require('./../../../models/user-profile');

router.get('/view/', function (req, res, next) {
	console.log("SETTINGS/VIEW ROUTE HIT BY USER WITH ID:", req.user.id);
	var userId = req.user.id;
	User.findById(userId)
	.then(function (user) {
		return UserProfile.findOne({
			where:
			{
				userId: userId
			}
		})
		.then(function (profile) {
			res.json({
				aboutMe: profile.aboutMe,
				username: user.username,
				displayRealIdentity: user.displayRealIdentity
			})
		})
	}).catch(next);
});

router.put('/username/', function (req, res, next) {
	var username = req.body.username;
	var userId = req.user.id;

	console.log("USERNAME ROUTE HIT. USERNAME:", username);

	if (swearjar.profane(username)) {
		res.json({
			valid: false
		})
		return;
	}

	User.findOne({
		where:
		{
			username: username
		}
	})
	.then(function (user) {
		if (user === null) {
			return User.findById(userId)
			.then(function (user) {
				return user.update({username: username});
			})
			.then(function (user) {
				console.log("USER WITH ID:", userId, "NOW HAS USERNAME:", username);
				res.send({
					valid: true,
					username: user.username
				});
			})
		} else {
			res.send({
				valid: false
			})
		}
	}).catch(next);
});

router.put('/toggleNameDisplayed/', function (req, res, next) {
	var displayRealIdentity = req.body.displayRealIdentity;
	var userId = req.user.id;
	User.findById(userId)
	.then(function (user) {
		return user.update({displayRealIdentity: displayRealIdentity})
	})
	.then(function (user) {
		res.send(user);
	}).catch(next);
});

router.put('/aboutMe/', function (req, res, next) {
	var text = req.body.aboutMe;
	var userId = req.user.id;

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
	}).catch(next);
});

module.exports = router;