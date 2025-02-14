const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ReportSchema = new Schema ({
    reason: {
        type: String,
        required: true,
    },
    ExtContext: {
        type: String
    },
    BTid: {
        type:String,
        required:true,
    }
})


const RP = mongoose.model('Report', ReportSchema)
module.exports = RP