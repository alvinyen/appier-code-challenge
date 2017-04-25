const check = require('check-types');

const checkUndefinedAndNull = require('./../utils/checkTools').checkUndefinedAndNull;
const checkLengthNotZero = require('./../utils/checkTools').checkLengthNotZero;
const checkNumber = require('./../utils/checkTools').checkNumber;
const checkRangeOfLatAndLng = require('./../utils/checkTools').checkRangeOfLatAndLng;

const jsonResponDataGenerator = require('./../utils/responseTools').jsonResponDataGenerator;

const checkLatAndLng = (queryLat, queryLng) => {
    let allCheckPassed = false ;

    console.log(`queryLat: ${queryLat}`);
    console.log(`queryLng: ${queryLng}`);

    if(checkUndefinedAndNull(queryLat, queryLng)){
        if(checkLengthNotZero(queryLat, queryLng)){
            if(checkNumber(Number(queryLat), Number(queryLng))){
                if(checkRangeOfLatAndLng(Number(queryLat), Number(queryLng))){
                    allCheckPassed = true ;
                }
            }
        }
    }
    
    return allCheckPassed ;
}
 

module.exports = (app) => {
    app.get('/v1/ubike-station/taipei', (req, res) => {
        const arr = [] ;
        
        const queryLat = req.query.lat ;
        const queryLng = req.query.lng ;

        if(!checkLatAndLng(queryLat, queryLng)){
            res.send(jsonResponDataGenerator(-1));
        }else{
            res.send([
                jsonResponDataGenerator(), 
                `all check passed: ${checkLatAndLng(queryLat, queryLng)}`
            ]);
        }
    });
}