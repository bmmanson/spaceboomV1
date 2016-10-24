var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	//user must be logged in to use app
	if (req.user) {
		next();
	} else {
		res.sendStatus(401);
	}
})

router.get('/', function (req, res, next) {
	res.send("API ROUTE");
})

//mount message router
router.use('/message', require('./message/'));
router.use('/user', require('./user/'));
router.use('/discovery', require('./discovery/'));
router.use('/comment', require('./comment/'));

module.exports = router;