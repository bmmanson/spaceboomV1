'use strict';

var passport = require('passport');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = function(app, db) {

	var dbStore = new SequelizeStore({
		db: db
	});

    var User = db.model('user'); 

	app.use(session({
		secret: 'keyboard cat',
		store: dbStore,
		resave: false,
		saveUninitialized: false
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