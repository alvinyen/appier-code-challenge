const check = require('check-types');
const URL = require('url').URL;
var fetch = require('node-fetch');
const querystring = require('querystring');

const checkUndefinedAndNull = require('./../utils/checkTools').checkUndefinedAndNull;
const checkLengthNotZero = require('./../utils/checkTools').checkLengthNotZero;
const checkNumber = require('./../utils/checkTools').checkNumber;
const checkRangeOfLatAndLng = require('./../utils/checkTools').checkRangeOfLatAndLng;

const jsonResponDataGenerator = require('./../utils/responseTools').jsonResponDataGenerator;

const googleGeoApiAdd = require('./../config/config').googleGeoApiAdd;

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

const checkIfIsInTaipei = async (numberLat, numberLng) => {
    let check = false ; 
    const queryStringObject = {
        latlng : `${numberLat},${numberLng}`
    } ;

    const urlString = ` ${googleGeoApiAdd}?${querystring.stringify(queryStringObject)} ` ;
    console.log(`urlString:  ${urlString}`);

    try{
        const httpResponse = await fetch(urlString);
        if(await httpResponse.status!=200){
            throw new Error(`${httpResponse.status(httpResponse.statusText)}`);
        }

        const result = await httpResponse.json()
        return result ;
    }catch(e){
        // zet get 
        console.log(`something wrong...${e}`);
    }
}

module.exports = (app) => {
    app.get('/v1/ubike-station/taipei',async (req, res) => {
        const arr = [] ;
        
        const queryLat = req.query.lat ;
        const queryLng = req.query.lng ;

        const waitForSendData = await checkIfIsInTaipei(Number(queryLat), Number(queryLng)) ;
        res.send(waitForSendData);

        // if( ! checkLatAndLng(queryLat, queryLng)){
        //     res.send(jsonResponDataGenerator(-1));
        // }else if( ! checkIfIsInTaipei(Number(queryLat), Number(queryLng))) {
        //     res.send(jsonResponDataGenerator(-2));
        // }else{
        //     res.send([
        //         jsonResponDataGenerator(), 
        //         `all check passed: ${checkLatAndLng(queryLat, queryLng)}`
        //     ]);
        // }
    });
}