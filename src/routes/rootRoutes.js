const check = require('check-types');

const jsonResponDataGenerator = require('./../utils/responseTools').jsonResponDataGenerator;
const checkLatAndLng = require('./../utils/check/latLng/verify').checkLatAndLng ;
const checkIfIsInTaipei = require('./../utils/check/location/verify').checkIfIsInTaipei ;

const YoubikeStation = require('./../models/youbike');

const IS_DB_CONNECTION_SUCCESS = require('./../models/dbTools').IS_DB_CONNECTION_SUCCESS ;

module.exports = async (app) => {
    app.get('/v1/ubike-station/taipei',async (req, res) => {
        const arr = [] ;
        
        const queryLat = req.query.lat ;
        const queryLng = req.query.lng ;

        // await checkIfIsInTaipei(Number(queryLat), Number(queryLng)) ;
        // const waitForSendData = await checkIfIsInTaipei(Number(queryLat), Number(queryLng)) ;
        // res.send(waitForSendData);
        if( ! app.get(IS_DB_CONNECTION_SUCCESS) ){
            res.send([jsonResponDataGenerator(-3), 'db connection failed']);
        } else if( ! checkLatAndLng(queryLat, queryLng)){
            res.send(jsonResponDataGenerator(-1));
        }else if( ! await checkIfIsInTaipei(Number(queryLat), Number(queryLng))) {
            res.send(jsonResponDataGenerator(-2));
        }else{
            res.send([
                jsonResponDataGenerator(), 

                // 下面這行跑了2次..
                `all check passed: ${checkLatAndLng(queryLat, queryLng)}`
            ]);
        }

        // console.log(parseFloat(queryLat));
        // console.log(typeof parseFloat(queryLat));
        // console.log(parseFloat(Number(queryLat)));
        // console.log(typeof parseFloat(Number(queryLat)));
    });
}