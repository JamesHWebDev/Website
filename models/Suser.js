const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Suser = new Schema({
    username: {
        type: String,
        required: true,
    }
})

const SU = mongoose.model('SearchUser', Suser)
module.exports = SU 