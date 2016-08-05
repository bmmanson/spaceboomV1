var express = require('express');
var router = express.Router();
var User = require('./../../../models/user');
var Message = require('./../../../models/message');

//ban user
router.put('/ban/:id', function (req, res, next) {
	var id = req.params.id;
	User.findOne({where:
		{id: id}
	}).then(function (user) {
		return user.update({banned: true});
	}).then(function (user) {
		res.send(user);
	}).catch(next);

})

//delete user -- for admin console
router.delete('/:id', function (req, res, next){
	res.send("UNDER CONSTRUCTION");
})

//get all users - admin panel
router.get('/', function (req, res, next) {
	User.findAll()
	.then(function (users) {
		res.json(users);
	}).catch(next);
})

//add user when a new user joins
router.post('/', function (req, res, next) {
	var email = req.body.email;
	var name = req.body.name;
	var authorPic = req.body.authorPic;

	User.create({email, name, authorPic})
	.then(function (success){
		res.json(success);
	}).catch(next);
})

module.exports = router;
