
/*
    Remember to set NODE_ENV=production when deploying

 */

module.exports = {
    "DATABASE_URI": process.env.DATABASE_URI,
    "FACEBOOK": {
        "clientID": process.env.FACEBOOK_APP_ID,
        "clientSecret": process.env.FACEBOOK_CLIENT_SECRET,
    },
    "GOOGLE": {
        "APIKEY": process.env.APIKEY,
    },
};

