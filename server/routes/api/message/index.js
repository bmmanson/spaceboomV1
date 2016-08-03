var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.send("MESSAGE ROUTE");
})

//get all messages -- for admin console

//user checks to see if new message

//get messages for user
//should get all discovered messages and all sent messages

//add message -- when user submits a message

//report message -- allow users to report an inappropriate message

//delete message (for admin panel, and for users)

//edit message (?)

module.exports = router;

