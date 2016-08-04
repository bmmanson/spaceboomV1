var db = require('./_db');
var User = require('./user');
var Message = require('./message');
var Discovery = require('./discovery');

Message.belongsTo(User, {as: 'author'});

User.belongsToMany(Message, { as: 'foundBy', through: 'discovery', foreignKey: 'discovererId'});
Message.belongsToMany(User, { as: 'message', through: 'discovery', foreignKey: 'messageId'});

module.exports = db;