const mongoose = require('mongoose')
const Schema = mongoose.Schema


const BoughtDKSchema = new Schema({
    user: {
        type:String,
        required:true,
    },
    DrumKit: {
        type: String,
        required:true,
    },
    price: {
        type: Number,
        required:true,
    },
}, {timestamps: true})


const BDK = mongoose.model('BoughtDrumKits', BoughtDKSchema)
module.exports = BDK