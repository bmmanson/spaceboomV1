var db = require('./_db');
var User = require('./user');
var Message = require('./message');
var Discovery = require('./discovery');

//a note to self in the future. For explanation for why this works, see:
//https://codedump.io/share/aMWdBzH4lHro/1/sequelize-hasmany-join-association
User.hasMany(Message, {as: "author", foreignKey: "authorId"});
Message.belongsTo(User, {as: "author", foreignKey: "authorId"});

User.belongsToMany(Message, { as: 'foundBy', through: 'discovery', foreignKey: 'discovererId'});
Message.belongsToMany(User, { as: 'message', through: 'discovery', foreignKey: 'messageId'});
Discovery.belongsTo(Message);


module.exports = db;