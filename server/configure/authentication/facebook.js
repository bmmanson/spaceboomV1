'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var facebookCredentials = require('./../../../fb-credentials');

module.exports = function (app, db) {

	var User = db.model('user');

	var credentials = {
		clientID: facebookCredentials.ID,
		clientSecret: facebookCredentials.SECRET,
		callbackURL: "http://localhost:1337/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'email', 'photos'],
		passReqToCallback: true
	};

	var verifyCallback = function(req, accessToken, refreshToken, profile, done) {
		console.log("PROFILE:", profile);

		User.findOne({where: 
			{
			facebookId: profile.id
			}
		})
		.then(function (user) {
			if (user) {
		    	user.sessionId = req.session.id;
		    	return user;	
			} else {
				User.create({ 
	   		 	facebookId: profile.id,
	   		 	email: profile.emails[0].value,
	    		name: profile.displayName,
	    		authorPic: profile.photos[0].value,
	    		}).then(function (user) {
	    			user.sessionId = req.session.id;
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

	passport.use(new FacebookStrategy(credentials, verifyCallback));

	app.get('/auth/facebook/callback', 
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	function(req, res) {
		// Successful authentication
		res.redirect('/');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));

}