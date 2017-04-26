const check = require('check-types');

const jsonResponDataGenerator = require('./../utils/responseTools').jsonResponDataGenerator;
const checkLatAndLng = require('./../utils/check/latLng/verify').checkLatAndLng ;
const checkIfIsInTaipei = require('./../utils/check/location/verify').checkIfIsInTaipei ;

module.exports = async (app) => {
    app.get('/v1/ubike-station/taipei',async (req, res) => {
        const arr = [] ;
        
        const queryLat = req.query.lat ;
        const queryLng = req.query.lng ;

        // await checkIfIsInTaipei(Number(queryLat), Number(queryLng)) ;
        // const waitForSendData = await checkIfIsInTaipei(Number(queryLat), Number(queryLng)) ;
        // res.send(waitForSendData);

        if( ! checkLatAndLng(queryLat, queryLng)){
            res.send(jsonResponDataGenerator(-1));
        }else if( ! await checkIfIsInTaipei(Number(queryLat), Number(queryLng))) {
            res.send(jsonResponDataGenerator(-2));
        }else{
            res.send([
                jsonResponDataGenerator(), 
                `all check passed: ${checkLatAndLng(queryLat, queryLng)}`
            ]);
        }
    });
}