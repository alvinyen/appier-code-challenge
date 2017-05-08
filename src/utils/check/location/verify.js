const getGeoData = require('./verifyTools').getGeoData ;

const STREET_ADDRESS = 'street_address' ;
const TAIPEI_CITY = 'Taipei City' ;
const TAIPEI_CITY_CH = '台北市' ;
const NEW_TAIPEI_CITY = 'New Taipei City' ;
const NEW_TAIPEI_CITY_CH= '新北市' ;
const ADMINISTRATIVE_AREA_LEVEL_1 ='administrative_area_level_1';

const isTaipeiCity = (longNameOfTheFifthAddressComponent) => {
    let isTaipeiCity = false ;
    switch (longNameOfTheFifthAddressComponent) {
        case TAIPEI_CITY :
            isTaipeiCity = true ;
            console.log(TAIPEI_CITY);
            break ;
        case TAIPEI_CITY_CH :
            isTaipeiCity = true ;
            console.log(TAIPEI_CITY_CH);
            break ;
        case NEW_TAIPEI_CITY :
            isTaipeiCity = false ;
            console.log(NEW_TAIPEI_CITY);
            break ;
        case NEW_TAIPEI_CITY_CH :
            isTaipeiCity = true ;
            console.log(NEW_TAIPEI_CITY_CH);
            break ;
        default:
            console.log(`not in ${TAIPEI_CITY}`);
    }
    return isTaipeiCity ;
} ;

const checkIfIsInTaipei = async (numberLat, numberLng, res) => {
    const responseData = await getGeoData(numberLat, numberLng, res);
    // console.log(responseData) ;
    const status = responseData.status ; 
    // console.log(`status: ${status}`);

    if(status !== 'OK'){
        // console.log('fetch Google GeoApi status not OK');
        return false ;
    }

    const results = responseData.results ; // array
    // console.log(`results: ${results}`);

    const firstObjectOfResults = results[0] ;       
    // console.log(`firstObjectOfResults: ${firstObjectOfResults}`);

    const theFirstTypeOfTypesArray = firstObjectOfResults.types[0] ;
    // console.log(`theFirstTypeOfTypesArray: ${theFirstTypeOfTypesArray}`);
    // street_address, country, political

    const addressComponentsArray = firstObjectOfResults.address_components ;
    // console.log(`addressComponents: ${addressComponents}`);
    let longNameOfAdministractiveAreaLevel1 = '' ;
    for(let index in addressComponentsArray){
        const addressComponent = addressComponentsArray[index] ;
        if( addressComponent.types[0] === ADMINISTRATIVE_AREA_LEVEL_1){
            longNameOfAdministractiveAreaLevel1 = addressComponent.long_name ;
            break ;
        }
    }
    console.log(`longNameOfAdministractiveAreaLevel1: ${longNameOfAdministractiveAreaLevel1}`);

    // const theFifthAddressComponent = addressComponents[4] ;
    // console.log(`theFifthAddressComponent: ${theFifthAddressComponent}`);

    // const theFirstTypeOfTheFifthAddressComponent = theFifthAddressComponent.types[0] ;
    // console.log(`theFirstTypeOfTheFifthAddressComponent: ${theFirstTypeOfTheFifthAddressComponent}`);
    // administrative_area_level_1

    // const longNameOfTheFifthAddressComponent = theFifthAddressComponent.long_name ;
    // console.log(`longNameOfTheFifthAddressComponent: ${longNameOfTheFifthAddressComponent}`);

    if(status === 'OK' 
        && longNameOfAdministractiveAreaLevel1.length !== 0 ){
        // console.log(`in checkIfIsInTaipei 『if』, status ok and longNameOfAdministractiveAreaLevel1.length !== 0`);
        const isTaipei = isTaipeiCity(longNameOfAdministractiveAreaLevel1) ;
        if(isTaipei){
            console.log(`isTaipei: ${isTaipei}`);
            return true ;
        }else{
            console.log(`isTaipei: ${isTaipei}`);
            return false ;
        }
    }else{
        // console.log(`in checkIfIsInTaipei 『else』： status !== ok or longNameOfAdministractiveAreaLevel1.length === 0 (no AdministractiveAreaLevel1 in address component array)`);
        return false ;
    }
}

module.exports = { 
    checkIfIsInTaipei
 } ;