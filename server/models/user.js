var Sequelize = require('sequelize');
var db = require('./_db');

var User = db.define('user', {
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	authorPic: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = User;