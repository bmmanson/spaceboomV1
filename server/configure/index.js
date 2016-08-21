'use strict';

module.exports = function (app, db) {
	app.use(function (req, res, next) {
		next();
	})
	require('./parsing-middleware')(app);
	require('./authentication')(app, db);
}