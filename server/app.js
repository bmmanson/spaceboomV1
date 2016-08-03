var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(require('./routes'));

var server = app.listen(1337, function(){
	console.log("listening on port 1337");
})