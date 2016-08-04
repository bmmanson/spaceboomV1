var db = require('./_db');
var User = require('./user');
var Message = require('./message');

Message.belongsTo(User, {as: 'author'});

//for discovery, will probably want to use belongsToMany

//see this link: http://docs.sequelizejs.com/en/latest/docs/associations/#belongs-to-many-associations

module.exports = db;