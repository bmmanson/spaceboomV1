// var facebookCredentials = require('./../../fb-credentials');
// var googleCredentials = require('./../../google-credentials');

// var fb = {
//     clientID: facebookCredentials.ID,
//     clientSecret: facebookCredentials.SECRET
// };

// var goog = {
//     APIKEY: googleCredentials.APIKEY
// }

module.exports = {
  "DATABASE_URI": process.env.DATABASE_URI, //"postgres://localhost:5432/spaceboomv1",
  "FACEBOOK_APP_ID": process.env.FACEBOOK_APP_ID,
  "FACEBOOK_SECRET": process.env.FACEBOOK_CLIENT_SECRET,
  "GOOGLE_API_KEY": process.env.GOOGLE_API_KEY,
    // "FACEBOOK": {
    //     "clientID": ,
    //     "clientSecret": ,
    // },
    // "GOOGLE": {
    //     "APIKEY": ,
    // },
  // "FACEBOOK": {
  //   "clientID": fb.clientID,
  //   "clientSecret": fb.clientSecret,
  // },
  // "GOOGLE": {
  //   "APIKEY": goog.APIKEY
  // }
};
