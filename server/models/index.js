var db = require('./_db');
var User = require('./user');
var Message = require('./message');

Message.belongsTo(User, {as: 'author'});

module.exports = db;