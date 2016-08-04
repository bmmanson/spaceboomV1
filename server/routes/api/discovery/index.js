var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');

var router = express.Router();

//user checks to see if new message
router.post('/new', function (req, res, next) {
//it's a post -- if there's a match, we're creating a new row in the discovery table
});

//mark a discovered message as unread
router.get('/unread/:id', function (req, res, next) {
//id must be the id of the discovery, not the message


});

//hide message (users has decided to delete message. we keep the discovery in the database, but to user it will appear hidden)
router.put('/hide/:id', function (req, res, next) {
//id must be the id of the discovery, not the message

});

module.exports = router;