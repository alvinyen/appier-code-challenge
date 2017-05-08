const jsonResponDataGenerator = require('./../utils/responseTools').jsonResponDataGenerator ;
const YoubikeStation = require('./../models/youbike') ;

const getStatationsFromDataBase = async (numberLng, numberLat, res) => {
    let youbikeStationsArray = [] ;
    try {
        const queryResult =  await YoubikeStation.find({location: { $near: [numberLng, numberLat] } }) ;
        for( key in queryResult) {
            if(youbikeStationsArray.length >= 2){
                break ;
            }

            const youbikeStation = queryResult[key] ;

            if( youbikeStation.sbi > 0 ){
                // console.log(youbikeStation.sna);
                youbikeStationsArray.push({
                    station: youbikeStation.sna,
                    num_ubike: youbikeStation.sbi
                });
            }else{
                console.log(`${youbikeStation.sna}: ${youbikeStation.sbi}`);
            }
        }
    }catch(e){
        res.status(500);
        res.send(jsonResponDataGenerator(-3));
        return [] ;
    }
    return youbikeStationsArray ;
}

module.exports = {
    getStatationsFromDataBase
} ;