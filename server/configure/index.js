module.exports = function (app, db) {
	require('./authentication')(app, db);
}