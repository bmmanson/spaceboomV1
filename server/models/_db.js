var Sequelize = require('sequelize');

var env = require('./../env');

var db = new Sequelize(env.DATABASE_URI, {
  logging: false
});

module.exports = db;