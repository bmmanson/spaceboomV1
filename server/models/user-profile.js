'use strict';

var Sequelize = require('sequelize');
var db = require('./_db');

var UserProfile = db.define('userprofile', {
	timesViewed: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	aboutMe: {
		type: Sequelize.STRING,
		defaultValue: "This user hasn't written a bio yet.",
	},
	messagesDiscovered: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	messagesSent: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	profilePic: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = UserProfile;