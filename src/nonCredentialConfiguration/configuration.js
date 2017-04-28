// const account = require('./../config/config').account;
// const password = require('./../config/config').password;

module.exports = {
    port: 3000,
    googleGeoApiAdd: 'https://maps.googleapis.com/maps/api/geocode/json',
    youbikeDataApiAdd: 'http://data.taipei/youbike' ,
    // dbConnectionString: 'mongodb://localhost:27017/appier-code-challenge'
    // dbConnectionString: process.env.MLAB_CONNECTION_STRING || `mongodb://${account}:${password}@ds123311.mlab.com:23311/appier-code-challenge`
    dbConnectionString: process.env.MLAB_CONNECTION_STRING
} ;