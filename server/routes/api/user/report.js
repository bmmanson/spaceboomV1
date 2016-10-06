var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var User = require('./../../../models/user');
var UserReport = require('./../../../models/user-report');

router.post('/add/:profileId', function (req, res, next) {
	var profileId = req.params.profileId;
	//remove req.body.id later -- only here for testing
	var reporterId = req.body.id;
	UserReport.create({
		reporterId: reporterId,
		reportedProfileId: profileId
	})
	.then(function (report) {
		res.json(report);
	}).catch(next);
});

router.get('/reportsByUserId/:profileId', function (req, res, next) {
	//for admin panel
	var profileId = req.params.profileId;
	User.findAll({
		where:
		{
			profileId: profileId
		}
	})
	.then(function (report) {
		res.json(report);
	}).catch(next);
});

router.put('/seenByAdmin/:id', function (req, res, next) {
	//for admin panel
	var reportId = req.params.id;
	UserReport.findById(reportId)
	.then(function (report) {
		if (report) {
			//check if seenByAdmin property already set to true
				//if not, update
			//update to change seenByAdmin property to false	
		}
	})
});

module.exports = router;