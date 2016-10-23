'use strict';

var express = require('express');
var db = require('./models');
var path = require('path');
var app = express();

require('./configure')(app, db);
app.use(require('./routes'));

// //error handling middleware
// app.use(function (req, res, next) {
//     var err = new Error('Not found');
//     err.status = 404;
//     next(err);
// });

// //send response
// app.use(function (err, req, res, next) {
//     err.status = err.status || 500;
//     console.log("Error route hit. Error status:", err.status);
//     res.status(err.status || 500);
//     res.json({status: err.status});
// });

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

