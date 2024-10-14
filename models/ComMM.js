const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CompletedOrder = new Schema ({
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
})


const CM = mongoose.model('CompletedMMOrders', CompletedOrder)
module.exports = CM