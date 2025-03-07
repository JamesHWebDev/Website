const mongoose = require('mongoose')
const Schema = mongoose.Schema


const PackShem = new Schema ({
    
    user: {
        type:String,
        required: true,
    },
    Package: {
        type: String,
        required: true,
    },


}, { timestamps: true })

const OD = mongoose.model('OrderedBeatPackages', PackShem)
module.exports = OD

