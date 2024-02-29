const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    imagePath : {
        type: String,
        required: true,
        unique: true
    },
    user_id : {
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

// Static create post method
postSchema.statics.createpost = async function(imagePath, user_id, coordinateX, coordinateY) {

    const post = await this.create({ imagePath, user_id, coordinateX, coordinateY })

    return post

}

module.exports = mongoose.model('Post', postSchema)