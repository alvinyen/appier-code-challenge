const CronJob = require('cron').CronJob;
const getYoubikeData = require('./getRemoteData/tools').getYoubikeData ;

const cronYoubikeData = () => {
    new CronJob('*/1 * * * *', () => {
        console.log( new Date() );
        getYoubikeData() ;
    }, null, true);
} ;

module.exports = {
    cronYoubikeData
} ;