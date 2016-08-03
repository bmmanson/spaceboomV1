var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/spaceboomv1', {
  logging: false
});

module.exports = db;