var path = require('path');
var devConfigPath = path.join(__dirname, './development.js');
var productionConfigPath = path.join(__dirname, './production.js');

if (process.env.NODE_ENV === 'production') {
    module.exports = require(productionConfigPath);
} else {
	// console.log("DEV RUNS");
	// process.env.DATABASE_URL = 'postgres://localhost:5432/spaceboomv1';
	// process.env.FACEBOOK_APP_ID = require('./../../fb-credentials').ID;
	// process.env.FACEBOOK_SECRET = require('./../../fb-credentials').SECRET;
	// process.env.GOOGLE_API_KEY = require('./../../google-credentials').APIKEY;
    //module.exports = require(devConfigPath);
}