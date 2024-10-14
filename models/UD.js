const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UDSchema = new Schema({

    username: {
        type: String,
        required: true,
    },
    NewPass: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    day: {
        type: Number,
        required: true,
    },
    emailaddress: {
        type: String,
        required: true,
    },
    pfp: {
        type:String,
        required: true,
    },
    package: {
        type: String,
        required: true,
    },
    verified: {
        type: String,
        required: true,
    }


}, { timestamps: true })

const UD = mongoose.model('UD', UDSchema)
module.exports = UD











