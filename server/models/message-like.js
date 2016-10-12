var Sequelize = require('sequelize');
var db = require('./_db');
var Message = require('./message');

var MessageLike = db.define('messagelike', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
}, {
	hooks: {
		afterCreate: function (messagelike, options) {
			MessageLike.findAll({where:
				{
					messageId: messagelike.messageId
				}
			})
			.then(function (messages) {
				Message.findById(messagelike.messageId)
				.then(function (message) {
					message.update({numberOfLikes: messages.length});
					console.log("NUMBER OF LIKES FOR MESSAGE", message.id, "IS NOW", messages.length);
				})
			})
		},
		afterDestroy: function (messagelike, options) {
			MessageLike.findAll({where:
				{
					messageId: messagelike.messageId
				}
			})
			.then(function (messages) {
				Message.findById(messagelike.messageId)
				.then(function (message) {
					message.update({numberOfLikes: messages.length});
					console.log("NUMBER OF LIKES FOR MESSAGE", message.id, "IS NOW", messages.length);
				})
			})
		},
	}
});

module.exports = MessageLike;