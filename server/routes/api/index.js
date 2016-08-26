var express = require('express');
var router = express.Router();

//router.use(function (req, res, next) {
	//eventually implement this, but not yet

	// if (req.user) {
	// 	next();
	// } else {
	// 	res.send("404");
	// }
//})

router.get('/', function (req, res, next) {
	res.send("API ROUTE");
})

//mount message router
router.use('/message', require('./message/'));
router.use('/user', require('./user/'));
router.use('/discovery', require('./discovery/'));
router.use('/comment', require('./comment/'));

module.exports = router;