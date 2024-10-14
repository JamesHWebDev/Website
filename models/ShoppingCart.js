const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ShopCartSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    VocalPreset: {
        type: String,
        required: true
    },
    DAW: {
        type: String,
        required: true,
    },
    price: {
        type:Number,
        required: true,
    },
    src: {
        type:String,
        required:true,
    },
    bomm: {
        type: Number,
        required: true,
    },
    SCNum: {
        type:String,
        required: true,
    }
}, { timestamps: true })

const SC = mongoose.model('ShoppingCartItems', ShopCartSchema)
module.exports = SC

