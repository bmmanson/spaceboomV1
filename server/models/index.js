var db = require('./_db');
var User = require('./user');
var Message = require('./message');
var Discovery = require('./discovery');

Message.belongsTo(User, {as: 'author'});

Message.belongsToMany(User, { as: 'foundBy', through: 'discovery', foreignKey: 'userFoundById'});
User.belongsToMany(Message, { as: 'message', through: 'discovery', foreignKey: 'messageId'});

module.exports = db;