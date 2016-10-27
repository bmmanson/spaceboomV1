var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var User = require('./../../../models/user');
var UserProfile = require('./../../../models/user-profile');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');
var Comment = require('./../../../models/comment');

var utils = require('./utils');

router.use('/wallpost', require('./wallpost'));
router.use('/report', require('./report'));
router.use('/settings', require('./settings'));

router.get('/login/:id', function (req, res, next) {
	console.log("Someone is logging in. ID:", req.params.id);

	var currentUserId = req.params.id;

	var allPostedMessages = Message.findAll({where: 
		{
			authorId: currentUserId,
			deletedByUser: false
		}, 
		include: 
		[
			{
			model: User, 
			as: "author"
			},
			{
			model: Comment,
			as: "comment",
			include: 
				{
				model: User,
				as: "author"
				}
			}
		]
	})
	var allDiscoveredMessages = Discovery.findAll({where: 
		{
			discovererId: currentUserId,
			hidden: false
		},
		include: 
		{
			model: Message, 
			as: "message", 
			include: 
			[
				{
				model: User, 
				as: "author"
				},
				{
				model: Comment,
				as: "comment",
				include: 
					{
					model: User,
					as: "author"
					}	
				}
			]
		}
	})
	var userInfo = User.findOne({where:
		{
			id: currentUserId
		}
	})

	Promise.all([
		allPostedMessages, 
		allDiscoveredMessages, 
		userInfo
	])
	.spread(function (sentMessages, discoveredMessages, userInfo) {
		res.json({
			sentMessages, 
			discoveredMessages,
			userInfo
		});
	}).catch(next);
});

router.get('/profile/:id', function (req, res, next) {
	var userId = req.params.id;

	UserProfile.findOne({
		where:
		{
			userId: userId
		}
	})
	.then(function (profile) {
		profile.update({timesViewed: profile.timesViewed + 1});
	})
	.then(function () {
		User.findOne({
			where: 
			{
				id: userId
			},
			include: 
			{
				model: UserProfile
			}

		})
		.then(function (user) {
			console.log("Sending profile with ID:", user.id, "to user with ID:", req.user.id);
			res.json(user);
		}).catch(next);
	}).catch(next);
	 
});

router.get('/discoveredUsers/:id', function (req, res, next) {
	var userId = req.params.id;
	Discovery.findAll({
		where: {
			discovererId: userId
		}
	})
	.then(function (discoveredMessages) {
		var promisesForDiscoveredMessages = [];
		discoveredMessages.forEach(function (discoveredMessage) {
			var id = discoveredMessage.messageId;
			promisesForDiscoveredMessages.push(Message.findById(id));
		});
		return Promise.all(promisesForDiscoveredMessages);
	})
	.then(function (messages) {
		var ids = utils.removeDuplicateUsers(messages);
		var promisesForUsers = [];
		ids.forEach(function (id) {
			promisesForUsers.push(User.findById(id));
		});
		return Promise.all(promisesForUsers);
	})
	.then(function (users) {
		res.json(users);
	}).catch(next);
});

//get all users - admin panel
router.get('/', function (req, res, next) {
	User.findAll()
	.then(function (users) {
		res.json(users);
	}).catch(next);
});
//ban user
router.put('/ban/:id', function (req, res, next) {
	var id = req.params.id;
	User.findOne({where:
		{
			id: id
		}
	}).then(function (user) {
		return user.update({banned: true});
	}).then(function (user) {
		res.send(user);
	}).catch(next);

});

//delete user -- for admin console
router.delete('/:id', function (req, res, next){
	res.send("Route does not yet exist");
});


module.exports = router;
