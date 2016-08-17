var User = require('./../../models/user');
var passport = require('passport');
var session = require('express-session');

module.exports = function(app, db) {

	app.use(session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function(user, done) {
	  done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

}