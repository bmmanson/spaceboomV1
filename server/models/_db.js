var Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL, {
  logging: false
})

module.exports = db;

/*
may at some point want this as an alternative solution for production mode

var db;

if (process.env.NODE_ENV === 'production') {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     5432,
    username: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_HOST,
    logging:  true,
    password: process.env.DATABASE_PASSWORD,
  })
} else {
  db = new Sequelize(process.env.DATABASE_URI, {
    logging: false
  });
}

*/