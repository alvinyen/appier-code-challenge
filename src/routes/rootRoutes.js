const check = require('check-types');

const jsonResponDataGenerator = require('./../utils/responseTools').jsonResponDataGenerator;
const checkLatAndLng = require('./../utils/check/latLng/verify').checkLatAndLng;
const checkIfIsInTaipei = require('./../utils/check/location/verify').checkIfIsInTaipei;

const YoubikeStation = require('./../models/youbike');

const IS_DB_CONNECTION_SUCCESS = require('./../models/dbTools').IS_DB_CONNECTION_SUCCESS;

const getStatationsFromDataBase = require('./../utils/youbikeStationTools').getStatationsFromDataBase;

module.exports = async (app) => {
    app.get('/v1/ubike-station/taipei', async (req, res) => {

        const queryLat = req.query.lat;
        const queryLng = req.query.lng;
        const numberLat = Number(queryLat);
        const numberLng = Number(queryLng);
        let resultOfGetStations = [];

        // console.log(`IS_DB_CONNECTION_SUCCESS: ${app.get(IS_DB_CONNECTION_SUCCESS)}`);

        if (!app.get(IS_DB_CONNECTION_SUCCESS)) {
            res.status(500);
            res.send(jsonResponDataGenerator(-3));
            // console.log(`IS_DB_CONNECTION_SUCCESS: ${app.get(IS_DB_CONNECTION_SUCCESS)}`);
            return ;
        } else if (!checkLatAndLng(queryLat, queryLng)) {
            res.status(200);
            res.send(jsonResponDataGenerator(-1));
            return ;
        } else if (! await checkIfIsInTaipei(numberLat, numberLng, res)) {
            res.status(200);
            res.send(jsonResponDataGenerator(-2));
            return ;
        } else {
            
            resultOfGetStations = await getStatationsFromDataBase(numberLng, numberLat, res) ;

            // console.log(resultOfGetStations.length);

            if (resultOfGetStations.length >= 0) {
                res.status(200);
                res.send(jsonResponDataGenerator(0, resultOfGetStations));
            } else if (resultOfGetStations.length == 0) {
                res.status(200);
                res.send(jsonResponDataGenerator(1));
            } else {
                res.status(500);
                res.send(jsonResponDataGenerator(-3));
                // console.log(`unknow failed`);
            }
            return ;
        }

        // res.status(500);
        // res.send(jsonResponDataGenerator(-3));
        // return;
    });
}