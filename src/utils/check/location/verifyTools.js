const googleGeoApiAdd = require('./../../../nonCredentialConfiguration/configuration').googleGeoApiAdd ;
const querystring = require('querystring');
const fetch = require('node-fetch');
const jsonResponDataGenerator = require('./../../responseTools').jsonResponDataGenerator ;

const getGeoData = async (numberLat, numberLng, res) => {
    let check = false ; 
    const queryStringObject = {
        latlng : `${numberLat},${numberLng}`
    } ;

    const urlString = ` ${googleGeoApiAdd}?${querystring.stringify(queryStringObject)} ` ;

    try{
        const httpResponse = await fetch(urlString);
        if(await httpResponse.status!=200){
            throw new Error(`${httpResponse.status(httpResponse.statusText)}`);
        }
        const result = await httpResponse.json()
        return result ;
    }catch(e){
        console.log(`something wrong：${e}`);
        res.status(500);
        res.send(jsonResponDataGenerator(-3));
    }
}

module.exports = {
    getGeoData
} ;