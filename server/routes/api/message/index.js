var express = require('express');
var Message = require('./../../../models/message');
var Discovery = require('./../../../models/discovery');

var router = express.Router();

//get messages for user
router.get('/user/:id', function (req, res, next) {
	var currentUserId = req.params.id;
	//should get all discovered messages and all sent messages when app starts up
	Message.findAll({where: 
		{authorId: currentUserId}
	})
	.then(function (sentMessages) {
		Discovery.findAll({where: {
			discovererId: currentUserId
		}})
		//still need to include the actual info for messages, authors and discoverers, and not just the id numbers
		.then(function (discoveredMessages) {
			res.json({
				sentMessages, 
				discoveredMessages
			});
		})
	}).catch(next);
});

router.get('/test', function (req, res, next) {
	console.log("YOU HIT A ROUTE ON THE SERVER!! FIRST TIME FROM A REACT-NATIVE APP!!");
	res.json({
		id: 14,
		body: "I COME FROM THE OTHER SIDE OF THE INTERNET! HOW HAUNTING!!.",
		author: "Joe Langer",
		locationName: "Financial District",
		locationCoords: [40.70790519856078, -74.01487782597542],
		city: "New York, NY",
		authorPic: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p100x100/11057221_10153411465937025_7220678579653297083_n.jpg?oh=7e3c4e26c604a1d09637fa4becc16c81&oe=582E91C9',
		reported: false,
		unread: true,
		currentUser: false
	})
})

//get all messages (for admin console)
router.get('/', function (req, res, next) {
	Message.findAll()
	.then(function(messages){
		res.json(messages);
	}).catch(next);
});

//post message -- when user submits a message
router.post('/', function (req, res, next) {
//may need to contact another API which will give names to locations based on latitude and longitude
});

//

//delete -- for admins only. removes from db
router.delete('/:id', function (req, res, next) {

});

//edit message (only user who posted a message is permitted to change its body)
router.put('/:id', function (req, res, next) {

});

module.exports = router;

