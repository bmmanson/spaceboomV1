var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.send("USER ROUTE");
})

//add user when a new user joins

//ban user

//delete user -- for admin console

module.exports = router;
