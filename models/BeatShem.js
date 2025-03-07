const mongoose = require('mongoose')
const Schema = mongoose.Schema


const BeatSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    src: {
        type:String,
        required: true,
    },
    BPM: {
        type:Number,
        required: true,
    },
    beatname: {
        type: String,
        required: true,
    },
    pob: {
        type: Number,
        required: true,
    },
    tag1: {
        type: String,
    },
    tag2: {
        type: String,
    },
    tag3: {
        type: String,
    },
    description: {
        type: String,
    },
    extSrc: {
        type:String,
    },
}, { timestamps: true })

const BT = mongoose.model('Beat', BeatSchema)
module.exports = BT





