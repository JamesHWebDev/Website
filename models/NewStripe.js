const mongoose = require('mongoose')
const Schema = mongoose.Schema



const RevSchema = new Schema ({
   email: {
    type: String,
    required:true,
   },
   AccountID: {
    type: String,
    required: true,
   }
}, { timestamps: true })


const NSA = mongoose.model('NewStripeAcc', RevSchema)
module.exports = NSA
