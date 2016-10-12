'use strict';

var Sequelize = require('sequelize');
var db = require('./_db');

var MessageReport = db.define('messagereport', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
});

module.exports = MessageReport;