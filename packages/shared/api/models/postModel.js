const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    imagePath : {
        type: String,
        required: true,
        unique: true
    },
    poster_id : {
        type: String,
        required: true,
    },
    coordinateX : {
        type: Number,
        required: true
    },
    coordinateY : {
        type: Number,
        required: true
    },
    likes : {
        type: Number,
        default: 0
    },
    dislikes : {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Post', postSchema)