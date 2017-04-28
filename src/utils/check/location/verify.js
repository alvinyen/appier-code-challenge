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
    console.log(`status: ${status}`);

    const results = responseData.results ; // array
    // console.log(`results: ${results}`);

    const firstObjectOfResults = results[0] ;       
    // console.log(`firstObjectOfResults: ${firstObjectOfResults}`);

    const theFirstTypeOfTypesArray = firstObjectOfResults.types[0] ;
    console.log(`theFirstTypeOfTypesArray: ${theFirstTypeOfTypesArray}`);
    // street_address, country, political

    const addressComponents = firstObjectOfResults.address_components ;
    // console.log(`addressComponents: ${addressComponents}`);

    const theFifthAddressComponent = addressComponents[4] ;
    // console.log(`theFifthAddressComponent: ${theFifthAddressComponent}`);

    const theFirstTypeOfTheFifthAddressComponent = theFifthAddressComponent.types[0] ;
    console.log(`theFirstTypeOfTheFifthAddressComponent: ${theFirstTypeOfTheFifthAddressComponent}`);
    // administrative_area_level_1

    const longNameOfTheFifthAddressComponent = theFifthAddressComponent.long_name ;
    console.log(`longNameOfTheFifthAddressComponent: ${longNameOfTheFifthAddressComponent}`);

    if(status === 'OK' 
        && theFirstTypeOfTypesArray === STREET_ADDRESS 
        && theFirstTypeOfTheFifthAddressComponent === ADMINISTRATIVE_AREA_LEVEL_1 ){

        console.log('gone');
        const isTaipei = isTaipeiCity(longNameOfTheFifthAddressComponent) ;
        if(isTaipei){
            console.log(`isTaipei: ${isTaipei}`);
            return true ;
        }else{
            console.log(`isTaipei: ${isTaipei}`);
            return false ;
        }

    }else{
        console.log('yo');
        return false ;
    }
}

module.exports = { 
    checkIfIsInTaipei
 } ;