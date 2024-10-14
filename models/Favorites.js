const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FavoriteSchema = new Schema({
    ID: {
        type: String,
        required: true,
    },
    user: {
        type:String,
        required:true,
    },

}, { timestamps: true })

const FV = mongoose.model('Favorites', FavoriteSchema)
module.exports = FV