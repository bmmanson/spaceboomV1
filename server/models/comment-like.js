var Sequelize = require('sequelize');
var db = require('./_db');

var CommentLike = db.define('commentlike', {
	id: {
	type: Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true
	},
});

module.exports = CommentLike;