'use strict';

module.exports = function (app, db) {
	app.use(function (req, res, next) {
		console.log("SERVER!!");
		console.log("req.url", req.url);
		console.log("req.method", req.method);
		next();
	})
	require('./parsing-middleware')(app);
	require('./authentication')(app, db);
}