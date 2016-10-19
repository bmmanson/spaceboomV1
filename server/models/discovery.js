'use strict';

var Sequelize = require('sequelize');
var db = require('./_db');
var Message = require('./message');
var UserProfile = require('./user-profile');

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
			var incrementTimesDiscovered = Discovery.findAll({where:
				{
					messageId: discovery.messageId
				}
			})
			.then(function (discoveries) {
				return Message.findById(discovery.messageId)
				.then(function (message) {
					message.update({timesDiscovered: discoveries.length});
					console.log("NUMBER OF TIMES DISCOVERED FOR MESSAGE", message.id, "IS NOW", discoveries.length);
				})
			});

			var incrementNumberOfDiscoveries = Discovery.findAll({where:
				{
					discovererId: discovery.discovererId
				}
			})
			.then(function (discoveries) {
				return UserProfile.findOne({where: 
					{
						userId: discovery.discovererId
					}
				})
				.then(function (profile) {
					profile.update({messagesDiscovered: discoveries.length});
					console.log("USER ID", discovery.discovererId, "HAS DISCOVERED", discoveries.length, " MESSAGES");
				})
			})

			Promise.all(incrementTimesDiscovered, incrementNumberOfDiscoveries)
			.then(function (discoveries) {
				console.log("DISCOVERY UPDATED");
			})
		}
	}
})

module.exports = Discovery;