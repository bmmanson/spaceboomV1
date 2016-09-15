var Sequelize = require('sequelize');
var db = require('./_db');
var Comment = require('./comment');

var CommentLike = db.define('commentlike', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
}, {
	hooks: {
		afterCreate: function (commentlike, options) {
			CommentLike.findAll({where:
				{
					commentId: commentlike.commentId
				}
			})
			.then(function (comments) {
				Comment.findById(commentlike.commentId)
				.then(function (comment) {
					comment.update({numberOfLikes: comments.length});
					console.log("NUMBER OF LIKES FOR COMMENT", comment.id, "IS NOW", comments.length);
				})
			})
		},
		afterDestroy: function (commentlike, options) {
			CommentLike.findAll({where:
				{
					commentId: commentlike.commentId
				}
			})
			.then(function (comments) {
				Comment.findById(commentlike.commentId)
				.then(function (comment) {
					comment.update({numberOfLikes: comments.length});
					console.log("NUMBER OF LIKES FOR COMMENT", comment.id, "IS NOW", comments.length);
				})
			})
		}
	}
});

module.exports = CommentLike;