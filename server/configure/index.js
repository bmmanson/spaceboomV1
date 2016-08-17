'use strict';

module.exports = function (app, db) {
	require('./parsing-middleware')(app);
	require('./authentication')(app, db);
}