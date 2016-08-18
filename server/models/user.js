'use strict';

var Sequelize = require('sequelize');
var db = require('./_db');

var User = db.define('user', {
	facebookId: {
		type: Sequelize.STRING,
		unique: true
	}, 
	email: {
		type: Sequelize.STRING
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	username: {
		type: Sequelize.STRING
	},
	authorPic: {
		type: Sequelize.STRING,
		allowNull: false
	},
	banned: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
}, 
{       
    getterMethods: {
		firstName:  function() {
			return this.name.split[0];
		}
    }
});

module.exports = User;