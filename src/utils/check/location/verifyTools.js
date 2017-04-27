const googleGeoApiAdd = require('./../../../config/config').googleGeoApiAdd ;
const querystring = require('querystring');
const fetch = require('node-fetch');

const getGeoData = async (numberLat, numberLng) => {
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

module.exports = {
    getGeoData
} ;