const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SpriceSchema = new Schema({
    min: {
        type: Number,
        required:true,
    },
    max: {
        type: Number,
       required: true,
    },
})

const Sprice = mongoose.model('SearchPrice', SpriceSchema)
module.exports = Sprice