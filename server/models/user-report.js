'use strict';

var Sequelize = require('sequelize');
var db = require('./_db');

var UserReport = db.define('userreport', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	seenByAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
});

//hook -- check to see if reported === true. 
//if it isn't, change to true -- else do nothing

module.exports = UserReport;