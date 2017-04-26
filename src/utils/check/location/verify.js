const getGeoData = require('./verifyTools').getGeoData ;

const checkIfIsInTaipei = async (numberLat, numberLng) => {
    const result = await getGeoData(numberLat, numberLng);
    console.log(result) ;
}

module.exports = { 
    checkIfIsInTaipei
 } ;