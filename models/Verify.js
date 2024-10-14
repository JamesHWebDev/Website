const mongoose = require('mongoose')
const Schema = mongoose.Schema


const VerifySchema = new Schema({
    username: {
        type:String,
        required:true,
    },
    Number: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true
    }

}, {timestamps: true})

VerifySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Verify = mongoose.model('VerifyNum', VerifySchema)
module.exports = Verify