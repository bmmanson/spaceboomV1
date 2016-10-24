'use strict';

module.exports = function (app, db) {
	
	app.setValue = app.set.bind(app);

	app.use(function (req, res, next) {
		next();
	})
	require('./app-variables')(app);
	require('./parsing-middleware')(app);
	require('./authentication')(app, db);
}