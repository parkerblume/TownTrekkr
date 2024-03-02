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
}, {timestamps: true})

// Static create post method
postSchema.statics.createpost = async function(imagePath, user_id, coordinateX, coordinateY) {

    const post = await this.create({ imagePath, user_id, coordinateX, coordinateY })

    return post

}

// Static get post method
postSchema.statics.getpost = async function (post_id) {
    const post = await this.findById(post_id)

    if (!post) {
        throw Error("No such post")
    }

    return post
}

// Static get posts method
postSchema.statics.getposts = async function () {
    const posts = await this.find({})

    return posts
}

module.exports = mongoose.model('Post', postSchema)