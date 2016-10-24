var facebookCredentials = require('./../../fb-credentials');
var googleCredentials = require('./../../google-credentials');

var fb = {
    clientID: facebookCredentials.ID,
    clientSecret: facebookCredentials.SECRET
};

var goog = {
    APIKEY: googleCredentials.APIKEY
}

module.exports = {
  "DATABASE_URI": "postgres://localhost:5432/spaceboomv1",
  "SESSION_SECRET": "",
  "FACEBOOK": {
    "clientID": fb.clientID,
    "clientSecret": fb.clientSecret,
  },
  "GOOGLE": {
    "APIKEY": goog.APIKEY
  }
};
