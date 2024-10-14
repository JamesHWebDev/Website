const mongoose = require('mongoose')
const Schema = mongoose.Schema


const BoughtVocalSchema = new Schema({
    VPname: {
        type: String,
        required: true,
    },
    VPuser: {
        type:String,
        required:true,
    },
    VPprice: {
        type:Number,
        required:true,
    },
    VPdaw: {
        type:String,
        required:true,
    },
    Wvpbr: {
        type:String,
        required:true,
    }
}, { timestamps: true })

const BV = mongoose.model('BoughtVocalPreset', BoughtVocalSchema)
module.exports = BV



