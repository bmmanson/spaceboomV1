var Sequelize = require('sequelize');
var db = require('./_db');

var Message = db.define('message', {
	body: {
		type: Sequelize.STRING(1200)
	},
	locationName: {
		type: Sequelize.STRING,
	},
	latitude: {
		type: Sequelize.STRING,
		allowNull: false
	},
	longitude: {
		type: Sequelize.STRING,
		allowNull: false
	},
	city: {
		type: Sequelize.STRING
	},
	reported: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	removed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

module.exports = Message;