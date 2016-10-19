'use strict';

var express = require('express');
var db = require('./models');
var path = require('path');
var app = express();

require('./configure')(app, db);
app.use(require('./routes'));

var port = 1337;
var server = app.listen(port, function(){
	console.log("listening on port", port);
	db.sync()
	.then(function () {
    	console.log('Database synchronated');
  	})
	.catch(function (err) {
    	console.error("Failed to synchronate database", err, err.stack);
	});
})

