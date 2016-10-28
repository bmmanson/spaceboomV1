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
				text: "Welcome to Spaceboom! Spaceboom is a location-based messaging app: it allows you to leave a messages at a specific location for others to find (specifically, the location where you are when you send the message). If another user goes to a location where you've posted a message, they will receive a notification telling them they’ve discovered it. The message will then be added to their collection of messages, and they’ll be able to read it. When you discover another user's message, you can reply to it, and so can everyone else who’s discovered it. You can also see the profiles of any user you come across by tapping on their picture. Enjoy the app!",
				authorId: 2,
				latitude: 40.70790519856078,
				longitude: -74.01487782597542,
				locationName: "Financial District",
				city: "New York, NY",
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