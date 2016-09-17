'use strict';

var Sequelize = require('sequelize');
var db = require('./_db');
var Message = require('./message');

var Discovery = db.define('discovery', {
	id: {
	type: Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true
	},
	unread: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
		allowNull: false
	},
	hidden: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
	},
	reported: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
	}
}, {
	hooks: {
		afterCreate: function (discovery, options) {
			Discovery.findAll({where:
				{
					messageId: discovery.messageId
				}
			})
			.then(function (discoveries) {
				Message.findById(discovery.messageId)
				.then(function (message) {
					message.update({timesDiscovered: discoveries.length});
					console.log("NUMBER OF TIMES DISCOVERED FOR MESSAGE", message.id, "IS NOW", discoveries.length);
				})
			})
		}
	}
})

module.exports = Discovery;