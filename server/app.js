var express = require('express');
var bodyParser = require('body-parser');

var db = require('./models');

var app = express();


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

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