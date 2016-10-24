'use strict';

var env = require('./../env');

module.exports = function (app) {
    app.set('env', env);
};
