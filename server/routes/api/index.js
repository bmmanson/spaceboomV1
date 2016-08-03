var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.send("API ROUTE");
})

//mount message router
router.use('/message', require('./message/'));
router.use('/user', require('./user/'));

module.exports = router;