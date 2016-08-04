var Sequelize = require('sequelize');
var db = require('./_db');

var Discovery = db.define('discovery', {
	unread: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
		allowNull: false
	},
	hidden: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
		allowNull: false
	}
})

module.exports = Discovery;