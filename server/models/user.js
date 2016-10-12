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