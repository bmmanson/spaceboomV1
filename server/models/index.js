var db = require('./_db');
var User = require('./user');
var UserProfile = require('./user-profile');
var WallPost = require('./wall-post');
var WallPostLike = require('./wall-post-like');
var Message = require('./message');
var MessageLike = require('./message-like');
var Discovery = require('./discovery');
var Comment = require('./comment');
var CommentLike = require('./comment-like');



//a note to self in the future. For explanation for why this works, see:
//https://codedump.io/share/aMWdBzH4lHro/1/sequelize-hasmany-join-association
User.hasMany(Message, {as: "author", foreignKey: "authorId"});
Message.belongsTo(User, {as: "author", foreignKey: "authorId"});

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

User.hasMany(WallPost, {as: "author", foreignKey: "authorId"});
WallPost.belongsTo(User, {as: "author", foreignKey: "authorId"});
User.hasMany(WallPost, {as: "user", foreignKey: "userId"});
WallPost.belongsTo(User, {as: "user", foreignKey: "userId"});
//User.belongsTo(WallPost, {as: "author", foreignKey: "authorId"});

User.hasMany(Comment, {as: "author", foreignKey: "authorId"});
Comment.belongsTo(User, {as: "author", foreignKey: "authorId"});
Message.hasMany(Comment, {as: "comment", foreignKey: "messageId"});
Comment.belongsTo(Message, {as: "comment", foreignKey: "messageId"});

User.belongsToMany(Message, { as: "author", through: 'discovery', foreignKey: 'discovererId'});
Message.belongsToMany(User, { as: "message", through: 'discovery', foreignKey: 'messageId'});
Discovery.belongsTo(Message);

User.belongsToMany(Comment, {as: "user", through: 'commentlike', foreignKey: 'userId'});
Comment.belongsToMany(User, {as: "comment", through: 'commentlike', foreignKey: 'commentId'});

User.belongsToMany(WallPost, {as: "user", through: "wallpostlike", foreignKey: "userId"});
WallPost.belongsToMany(User, {as: "wallpost", through: "wallpostlike", foreignKey: "wallpostId"});

User.belongsToMany(Message, {as: "user", through: 'messagelike', foreignKey: 'userId'});
Message.belongsToMany(User, {as: "message", through: 'messagelike', foreignKey: 'messageId'});

module.exports = db;