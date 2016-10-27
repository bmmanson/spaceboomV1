var Sequelize = require('sequelize');

var env = require('./../env');

var db;

if (process.env.NODE_ENV === 'production') {
    // the application is executed on Heroku ... use the postgres database
    db = new Sequelize(env.DATABASE_URI, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true 
    })
} else {
// the application is executed on the local machine ... use mysql
	db = new Sequelize(env.DATABASE_URI, {
		logging: false
	});
}

// original: 
// var db = new Sequelize(env.DATABASE_URI, {
//   logging: false
// });

module.exports = db;