const express = require('express');
let app = express();
const port = require('./config/config').port ;
const rootRoutes = require('./routes/rootRoutes');
const cronYoubikeData = require('./utils/cronTools').cronYoubikeData ;
const getYoubikeData = require('./utils/getRemoteData/tools').getYoubikeData ;
const mongoose = require('mongoose');
const dbConnectionString = require('./config/config').dbConnectionString ;
const YoubikeStation = require('./models/youbike');
const jsonResponDataGenerator = require('./utils/responseTools').jsonResponDataGenerator ;

console.log(dbConnectionString);
mongoose.connect(dbConnectionString);
const db = mongoose.connection;
const IS_DB_CONNECTION_SUCCESS = require('./models/dbTools').IS_DB_CONNECTION_SUCCESS ;
let isDbConnectionSuccess = true ;

db.on('error', (err) => { 
    console.log('db connection failed!..', err); 
    isDbConnectionSuccess = false ;
    app.set(IS_DB_CONNECTION_SUCCESS, isDbConnectionSuccess);
    // process.exit(1) ;
    // set a db connection variable to indecate suceess or not, to response -3
    // jsonResponDataGenerator();
} );

db.once('open', () => { 
    app.set(IS_DB_CONNECTION_SUCCESS, isDbConnectionSuccess);
    cronYoubikeData();
    YoubikeStation.collection.ensureIndex({ location: '2d' });
    // console.log('success'); 
    // //1. 創建實體
    // let user = new User({
    //     username: 'alvinnnn',
    //     password: 'cestlavi'
    // });
    // //2. 保存
    // user.save();
} );

rootRoutes(app) ;

// getYoubikeData();

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});