var express = require('express');
var router = express.Router();

//user checks to see if new message
router.get('/new', function (req, res, next) {

});

//get messages for user
router.get('/user/:id', function (req, res, next) {
	//should get all discovered messages and all sent messages when app starts up

	//if a sent message, adds a currentUser property with value true

	//if a discovered message, adds a currentUser property with value false
});

//report message -- allow users to report an inappropriate message
router.get('/report', function (req, res, next) {

});

//mark a message as unread
router.get('/unread/:id', function (req, res, next) {

});

//get all messages (for admin console)
router.get('/', function (req, res, next) {
	
});

//post message -- when user submits a message
router.post('/', function (req, res, next) {

});


//hide message (initial deletion - users can't see, but still in database)
router.put('/hide/:id', function (req, res, next) {

});

//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});

//edit message (?)
router.put('/:id', function (req, res, next) {

});

module.exports = router;

