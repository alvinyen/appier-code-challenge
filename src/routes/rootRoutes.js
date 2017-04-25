const check = require('check-types');

module.exports = (app) => {
    app.get('/v1/ubike-station/taipei', (req, res) => {
        const arr = [] ;
        let allCheckPassed = false ;
        
        const queryLat = req.query.lat ;
        const queryLng = req.query.lng ;

        console.log(`queryLat: ${queryLat}`);
        console.log(`queryLng: ${queryLng}`);

        if( check.assigned(queryLat) && check.assigned(queryLng)){
            allCheckPassed = true ;
            console.log(`check.assigned(queryLat): ${check.assigned(queryLat)}`);
            console.log(`check.assigned(queryLng): ${check.assigned(queryLng)}`);
            console.log('lat and lng are assigned');
        }else{
            console.log(`check.assigned(queryLat): ${check.assigned(queryLat)}`);
            console.log(`check.assigned(queryLng): ${check.assigned(queryLng)}`);
            console.log('lat or/and lng is/are unassigned');
        }

        

        res.send(allCheckPassed);
    });
}