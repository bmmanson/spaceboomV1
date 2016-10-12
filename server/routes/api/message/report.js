var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var Message = require('./../../../models/message');
var MessageReport = require('./../../../models/message-report');

router.post('/add/:messageId', function (req, res, next) {
	var messageId = req.params.messageId;
	//remove req.body.id later -- only here for testing
	var reporterId = req.user.id;
	MessageReport.create({
		reporterId: reporterId,
		messageId: messageId
	})
	.then(function (report) {
		console.log("MESSAGE WITH ID:", messageId, "RECEIVED FROM USER WITH ID:", req.user.id);
		res.json(report);
	}).catch(next);
});

router.get('/reportsByMessageId/:messageId', function (req, res, next) {
	//for admin panel
	var messageId = req.params.messageId;
	MessageReport.findAll({
		where:
		{
			messageId: messageId
		}
	})
	.then(function (reports) {
		res.json(reports);
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