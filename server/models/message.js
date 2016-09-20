'use strict';

var Sequelize = require('sequelize');
var db = require('./_db');
var UserProfile = require('./user-profile');

var Message = db.define('message', {
	text: {
		type: Sequelize.STRING(1200)
	},
	locationName: {
		type: Sequelize.STRING,
	},
	latitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	longitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	city: {
		type: Sequelize.STRING
	},
	deletedByUser: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	numberOfLikes: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	timesDiscovered: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
}, {
	hooks: {
		afterCreate: function (message, options) {
			Message.findAll({
				where: 
				{
				authorId: message.authorId
				}
			})
			.then(function (messages) {
				UserProfile.findOne({
					where: 
					{
					userId: message.authorId
					}
				})
				.then(function (profile) {
					profile.update({messagesSent: messages.length});
					console.log("USER WITH ID", message.authorId, "HAS SENT", messages.length, "MESSAGE/S");
				})
			})
		}
	}
});

module.exports = Message;