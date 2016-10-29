'use strict';

var Sequelize = require('sequelize');
var Message = require('./message');
var Discovery = require('./discovery');
var db = require('./_db');

var User = db.define('user', {
	facebookId: {
		type: Sequelize.STRING,
		unique: true
	}, 
	email: {
		type: Sequelize.STRING
	},
	authorPic: {
		type: Sequelize.STRING,
		allowNull: false
	},
	banned: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	displayRealIdentity: {
		type: Sequelize.BOOLEAN,
		defaultValue: true
	},
	username: {
		type: Sequelize.STRING,
	},
	facebookName: {
		type: Sequelize.STRING
	}
},
{
	hooks: {
		afterCreate: function (user, options) {
			Message.create({
				text: "Welcome to Spaceboom! Spaceboom is a location-based messaging app: it allows you to leave messages for others to find at specific locations. If another user goes to the place where you were when you posted a message, the user will receive a notification telling them they’ve discovered it. The message will then be added to their collection of messages, and they’ll be able to read it. When you discover another user's message, you can reply to it, and so can everyone else who’s discovered it. You can also see the profiles of any user you come across by tapping on their picture. Enjoy the app!",
				authorId: 2,
				latitude: 90.0,
				longitude: 0.0,
				locationName: "The North Pole",
				city: "Arctic Ocean",
			})
			.then(function (message) {
				Discovery.create({
					messageId: message.id,
					discovererId: user.id
				})
				.then(function (discovery) {
					console.log("A message for new user with ID", discovery.discovererId, "has been created.");
				})
			});
		}
	},
	getterMethods: {
		facebookId: function() {
			return "";
		},
		name: function() {
			if (this.displayRealIdentity) {
				return this.facebookName;
			} else {
				return this.username;
			}
		}
    }
});

module.exports = User;