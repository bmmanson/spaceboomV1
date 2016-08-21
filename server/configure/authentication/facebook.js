'use strict';
var passport = require('passport');
var FacebookStrategyToken = require('passport-facebook-token');
var facebookCredentials = require('./../../../fb-credentials');

//use passport-facebook-tokens

module.exports = function (app, db) {

	var User = db.model('user');

	var credentials = {
		clientID: facebookCredentials.ID,
		clientSecret: facebookCredentials.SECRET,
		profileFields: ['id', 'displayName', 'email', 'photos'],
	};

	var verifyCallback = function(accessToken, refreshToken, profile, done) {
		console.log("PROFILE:", profile);

		User.findOne({where: 
			{
			facebookId: profile.id
			}
		})
		.then(function (user) {
			if (user) {
		    	return user;	
			} else {
				User.create({ 
	   		 	facebookId: profile.id,
	   		 	email: profile.emails[0].value,
	    		name: profile.displayName,
	    		authorPic: profile.photos[0].value,
	    		}).then(function (user) {
	    			return user;
	    		})
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
		var sessionId = req.session.id;
		console.log("USER SESSION ID:", sessionId);
		console.log("REQ.USER OBJECT", req.user);
		// Successful authentication
		// User.findOne({where: 
		// 	{
		// 		facebookId: 
		// 	}
		// })
		res.json({test: true});
	});

}