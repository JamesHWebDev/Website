const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SoldBeatsSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    filename: {
        type:String,
        required:true,
    }

}, { timestamps: true })


const SMM = mongoose.model('SoldMM', SoldBeatsSchema)
module.exports = SMM