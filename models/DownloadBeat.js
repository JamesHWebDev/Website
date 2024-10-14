const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SoldBeatsSchema = new Schema({
    UserCurr: {
        type: String,
        required: true,
    },
    bomm: {
        type: Number,
        required: true,
    },
    UserSell: {
        type: String,
    },
    Beatpob: {
        type: Number,
    },
    BeatName: {
        type: String,
    },
    NameFile: {
        type:String,
        required:true,
    },
    src: {
        type:String,
    },
    DAW: {
        type:String,
    },
}, { timestamps: true })


const DB = mongoose.model('DownloadBeat', SoldBeatsSchema)
module.exports = DB