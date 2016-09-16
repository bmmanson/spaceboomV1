var db = require('./_db');
var User = require('./user');
var Message = require('./message');
var Discovery = require('./discovery');
var Comment = require('./comment');
var CommentLike = require('./comment-like');

//a note to self in the future. For explanation for why this works, see:
//https://codedump.io/share/aMWdBzH4lHro/1/sequelize-hasmany-join-association
User.hasMany(Message, {as: "author", foreignKey: "authorId"});
Message.belongsTo(User, {as: "author", foreignKey: "authorId"});

User.hasMany(Comment, {as: "author", foreignKey: "authorId"});
Comment.belongsTo(User, {as: "author", foreignKey: "authorId"});
Message.hasMany(Comment, {as: "comment", foreignKey: "messageId"});
Comment.belongsTo(Message, {as: "comment", foreignKey: "messageId"});

User.belongsToMany(Message, { as: "author", through: 'discovery', foreignKey: 'discovererId'});
Message.belongsToMany(User, { as: "message", through: 'discovery', foreignKey: 'messageId'});
Discovery.belongsTo(Message);

User.belongsToMany(Comment, {as: "user", through: 'commentlike', foreignKey: 'userId'});
Comment.belongsToMany(User, {as: "comment", through: 'commentlike', foreignKey: 'commentId'});
CommentLike.belongsTo(Comment);

module.exports = db;