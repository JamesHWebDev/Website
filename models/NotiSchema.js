const mongoose = require('mongoose')
const Schema = mongoose.Schema



const RevSchema = new Schema ({
    CurrUser: {
        type: String,
        requried: true,
    },
    SellUser: {
        type: String,
        required: true,
    },
    NameBeat: {
    type: String,
    required: true,
    },
    pobBeat: {
        type: Number,
        required: true,
    },
    ID: {
        type:String,
        required: true,
    },
}, { timestamps: true })


const Noti = mongoose.model('Noti', RevSchema)
module.exports = Noti
