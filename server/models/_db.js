var Sequelize = require('sequelize');

var env = require('./../env');

var db;

if (process.env.NODE_ENV === 'production') {
    // the application is executed on Heroku ... use the postgres database
    db = new Sequelize(process.env.DATABASE_URL, {
      // dialect:  'postgres',
      // protocol: 'postgres',
      // port:     5432,
      // username: process.env.DATABASE_USERNAME,
      // host: process.env.DATABASE_HOST,
      // logging:  true,
      // password: process.env.DATABASE_PASSWORD,

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