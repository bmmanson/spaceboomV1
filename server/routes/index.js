var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.send("ROOT ROUTE");
});

//mount api router
router.use('/api', require('./api/'));

module.exports = router;