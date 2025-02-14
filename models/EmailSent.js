const mongoose = require('mongoose')
const Schema = mongoose.Schema


const EmailSchema = new Schema({
    EmailSubject: {
        type: String,
        required: true,
    },
    EmailMessage : {
        type: String,
        required: true,
    }
}, { timestamps: true })

const ES = mongoose.model('Email', EmailSchema)
module.exports = ES

