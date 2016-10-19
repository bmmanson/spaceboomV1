'use strict';

var express = require('express');
var db = require('./models');
var path = require('path');
var app = express();

require('./configure')(app, db);
app.use(require('./routes'));

//error handling middleware
//log
app.use(function (err, req, res, next) {
    console.log("ERROR-HANDLING MIDDLEWARE HIT");
    next(err);
});
//send response
app.use(function (err, req, res, next) {
    console.log("ERROR ROUTE HIT");
    res.status(err.status || 500).send({status: err.status});
});

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

