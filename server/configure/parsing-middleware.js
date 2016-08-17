'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

module.exports = function (app) {

	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

}