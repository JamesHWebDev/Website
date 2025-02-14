const mongoose = require('mongoose')
const Schema = mongoose.Schema



const RevSchema = new Schema({
    user: {
        type:String,
        required: true,
    },
    genre: {
        type:String,
        required: true,
    },
    context: {
        type:String,
        required:true,
    },
    WhichPack: {
        type:String,
        required: true,
    },
} , { timestamps: true })

const PD = mongoose.model('Pending', RevSchema)
module.exports = PD