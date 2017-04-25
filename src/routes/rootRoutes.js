const check = require('check-types');



const checkUndefinedAndNull = (queryLat, queryLng) => {
    if( check.assigned(queryLat) && check.assigned(queryLng)){
        console.log(`check.assigned(queryLat): ${check.assigned(queryLat)}`);
        console.log(`check.assigned(queryLng): ${check.assigned(queryLng)}`);
        console.log('lat and lng are assigned');
        return true ;
    }else{
        console.log(`check.assigned(queryLat): ${check.assigned(queryLat)}`);
        console.log(`check.assigned(queryLng): ${check.assigned(queryLng)}`);
        console.log('lat or/and lng is/are unassigned');
        return false ;
    }
}

const checkLengthNotZero = (queryLat, queryLng) => {
    if( ! check.hasLength(queryLat, 0) && ! check.hasLength(queryLng, 0) ){
        console.log(`! check.hasLength(queryLat, 0): ${! check.hasLength(queryLat, 0)}`);
        console.log(`! check.hasLength(queryLng, 0): ${! check.hasLength(queryLng, 0)}`);
        console.log('lat and lng \'s size are not zero');
        return true ;
    }else{
        console.log(`! check.hasLength(queryLat, 0): ${! check.hasLength(queryLat, 0)}`);
        console.log(`! check.hasLength(queryLng, 0): ${! check.hasLength(queryLng, 0)}`);
        console.log('lat or/and lng \'s size is/are zero');
        return false ;
    }
}

const checkNumber = (numberLat, numberLng) => {
    console.log(`numberLat: ${numberLat}`);
    console.log(`numberLng: ${numberLng}`);

    if( check.number(numberLat) && check.number(numberLng) ){
        console.log(`check.number(numberLat): ${check.number(numberLat)}`);
        console.log(`check.number(numberLng): ${check.number(numberLng)}`);
        console.log('lat and lng are number ');
        return true ;
    }else{
        console.log(`check.number(numberLat): ${check.number(numberLat)}`);
        console.log(`check.number(numberLng): ${check.number(numberLng)}`);
        console.log('lat or/and lng is/are not number ');
        return false ;
    }
}

const checkRangeOfLatAndLng = (numberLat, numberLng) => {
    console.log(`numberLat: ${numberLat}`);
    console.log(`numberLng: ${numberLng}`);

    if( check.inRange(numberLat, -90, 90) && check.inRange(numberLng, -180, 180) ){
        console.log(`check.inRange(numberLat, -90, 90): ${check.inRange(numberLat, -90, 90)}`);
        console.log(`check.inRange(numberLng, -180, 180): ${check.inRange(numberLng, -180, 180)}`);
        console.log('lat and lng are in range ');
        return true ;
    }else{
        console.log(`check.inRange(numberLat, -90, 90): ${check.inRange(numberLat, -90, 90)}`);
        console.log(`check.inRange(numberLng, -180, 180): ${check.inRange(numberLng, -180, 180)}`);
        console.log('lat or/and lng is/are not in range ');
        return false ;
    }
}

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

        res.send(`all check passed: ${checkLatAndLng(queryLat, queryLng)}`);
    });
}