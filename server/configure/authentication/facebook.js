'use strict';
var passport = require('passport');
var FacebookStrategyToken = require('passport-facebook-token');
var env = require('./../../env');

module.exports = function (app, db) {

	var User = db.model('user');

	var credentials = {
		clientID: process.env.FACEBOOK_APP_ID,
		clientSecret: process.env.FACEBOOK_SECRET,
		profileFields: ['id', 'displayName', 'photos', 'emails', 'gender'],
	};

	var verifyCallback = function(accessToken, refreshToken, profile, done) {
		console.log("PROFILE:", profile);

		User.findOne({where: 
			{
			facebookId: profile.id
			}
		})
		.then(function (user) {
			if (user === null) {
				return User.create({ 
	   				facebookId: profile.id,
	   			 	email: profile.emails[0].value,
	    			facebookName: profile.displayName,
	    			authorPic: profile.photos[0].value,
	    		})		    		
			} else {
				return user;
			}
		})
	    .then(function (userToLogin) {
	    	done(null, userToLogin);
	    })
	    .catch(function (err) {
	    	done(err);
	    });
	}

	passport.use(new FacebookStrategyToken(credentials, verifyCallback));

	app.post('/auth/facebook/token', 
	passport.authenticate('facebook-token'),
	function(req, res) {

		var response = {
			userId: req.user.id,
			email: req.user.email,
			facebookName: req.user.name,
			authorPic: req.user.authorPic,
			username: req.user.username
		}

		res.json(response);
	});

}