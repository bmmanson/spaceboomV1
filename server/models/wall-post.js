'use strict';

var Sequelize = require('sequelize');
var db = require('./_db');

var WallPost = db.define('wallpost', {
	text: {
		type: Sequelize.STRING,
		allowNull: false
	},
	unread: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
		allowNull: false
	},
	deletedByUser: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	reported: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	numberOfLikes: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
});

module.exports = WallPost;