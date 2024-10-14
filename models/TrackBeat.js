const mongoose =  require('mongoose')
const Schema = mongoose.Schema


const TrackBeatSchema = new Schema ({
    user: {
        type: String,
        required:true,
    },
}, { timestamps: true })

const TB = mongoose.model('TrackBeat', TrackBeatSchema)
module.exports = TB