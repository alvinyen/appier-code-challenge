const checkUndefinedAndNull = require('./verifyTools').checkUndefinedAndNull;
const checkLengthNotZero = require('./verifyTools').checkLengthNotZero;
const checkNumber = require('./verifyTools').checkNumber;
const checkRangeOfLatAndLng = require('./verifyTools').checkRangeOfLatAndLng;

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

module.exports = {
    checkLatAndLng
} ;