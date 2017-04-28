const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const YoubikeStationSchema = new Schema(
    {
        sno: { type: String,  required: true },
        sna: { type: String,  required: true },
        location: { type: [Number],  required: true },
        sbi: { type: Number, required: true }
    }
);
// YoubikeStationSchema.index( { location: '2d' } );

//指定Schema所對應的collection
//第1個參數代表collection名，進到mongodb之後首字會被轉為小寫、且會轉為復數型 (單複數同型就只會把首字轉為小寫)
module.exports = mongoose.model('YoubikeStation', YoubikeStationSchema);
// module.exports = mongoose.model('User', UserSchema);
// ???s collection

// var PlaceSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         geolocation: {
//             lat: Number,
//             lng: Number
//         },
//         address: {
//             type: String
//         }
//     }
// );
// PlaceSchema.index({
//     geolocation: '2d'
// });

// animalSchema.index({ _id: 1 }, { sparse: true });
// http://stackoverflow.com/questions/12573753/creating-multifield-indexes-in-mongoose-mongodb