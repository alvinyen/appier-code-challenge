const check = require('check-types');

let allCheckPassed = true ;

const checkUndefinedAndNull = (queryLat, queryLng) => {
    if( check.assigned(queryLat) && check.assigned(queryLng)){
        console.log(`check.assigned(queryLat): ${check.assigned(queryLat)}`);
        console.log(`check.assigned(queryLng): ${check.assigned(queryLng)}`);
        console.log('lat and lng are assigned');
    }else{
        console.log(`check.assigned(queryLat): ${check.assigned(queryLat)}`);
        console.log(`check.assigned(queryLng): ${check.assigned(queryLng)}`);
        console.log('lat or/and lng is/are unassigned');
        allCheckPassed = false ;
    }
}

const checkLengthNotZero = (queryLat, queryLng) => {
    if( ! check.hasLength(queryLat, 0) && ! check.hasLength(queryLng, 0) ){
        console.log(`! check.hasLength(queryLat, 0): ${! check.hasLength(queryLat, 0)}`);
        console.log(`! check.hasLength(queryLng, 0): ${! check.hasLength(queryLng, 0)}`);
        console.log('lat and lng \'s size are not zero');
    }else{
        console.log(`! check.hasLength(queryLat, 0): ${! check.hasLength(queryLat, 0)}`);
        console.log(`! check.hasLength(queryLng, 0): ${! check.hasLength(queryLng, 0)}`);
        console.log('lat or/and lng \'s size is/are zero');
        allCheckPassed = false ;
    }
}

module.exports = (app) => {
    app.get('/v1/ubike-station/taipei', (req, res) => {
        const arr = [] ;
        
        const queryLat = req.query.lat ;
        const queryLng = req.query.lng ;

        console.log(`queryLat: ${queryLat}`);
        console.log(`queryLng: ${queryLng}`);

        checkUndefinedAndNull(queryLat, queryLng);
        checkLengthNotZero(queryLat, queryLng);

        res.send(allCheckPassed);
    });
}