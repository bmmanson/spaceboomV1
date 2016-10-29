var Sequelize = require('sequelize');
var db = require('./_db');
var WallPost = require('./wall-post');

var WallPostLike = db.define('wallpostlike', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
}, {
	hooks: {
		afterCreate: function (wallpostlike, options) {
			WallPostLike.findAll({where:
				{
					wallpostId: wallpostlike.wallpostId
				}
			})
			.then(function (wallposts) {
				WallPost.findById(wallpostlike.wallpostId)
				.then(function (wallpost) {
					wallpost.update({numberOfLikes: wallposts.length});
					console.log("NUMBER OF LIKES FOR WALL POST WITH ID", wallpost.id, "IS NOW", wallposts.length);
				})
			})
		},
		afterDestroy: function (wallpostlike, options) {
			WallPostLike.findAll({where:
				{
					wallpostId: wallpostlike.wallpostId
				}
			})
			.then(function (wallposts) {
				WallPost.findById(wallpostlike.wallpostId)
				.then(function (wallpost) {
					wallpost.update({numberOfLikes: wallposts.length});
					console.log("NUMBER OF LIKES FOR WALL POST WITH ID", wallpost.id, "IS NOW", wallposts.length);
				})
			})
		}
	}
});

module.exports = WallPostLike;