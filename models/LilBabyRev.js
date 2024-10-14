const mongoose = require('mongoose');
const Schema = mongoose.Schema




const RevSchema = new Schema ({
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    }
} , { timestamps: true })

const LilBabyREV = mongoose.model('LilBabyRev', RevSchema)
module.exports = LilBabyREV


