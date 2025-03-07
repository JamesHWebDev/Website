const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SoldBeatsSchema = new Schema({
    CurrUser: {
        type: String,
        required: true,
    },
    bomm: {
        type: Number,
        required: true,
    },
    SellUser: {
        type: String,
        
    },
    pobBeat: {
        type: Number,
    
    },
    NameBeat: {
        type: String,
        
    },
    filename: {
        type:String,
        required:true,
    }

}, { timestamps: true })


const SB = mongoose.model('SoldBeat', SoldBeatsSchema)
module.exports = SB