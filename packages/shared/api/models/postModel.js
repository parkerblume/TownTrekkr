const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./userModel')

const postSchema = new Schema({
    fileId : {
        type: String,
        required: true,
        unique: true
    },
    user_id : {
        type: String,
        required: true,
    },
    town : {
        type: String,
        required: true
    },
    coordinateX : {
        type: Number,
        required: true
    },
    coordinateY : {
        type: Number,
        required: true
    },
    name : {
        type: String,
        require: true
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
postSchema.statics.createpost = async function(fileId, user_id, town, coordinateX, coordinateY) {

    const post = await this.create({ fileId, user_id, town, coordinateX, coordinateY })

    return post

}

postSchema.statics.getPostByTown = async function(townId)
{
    const posts = await this.find({ town: townId });
    return posts;
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

postSchema.statics.deletepost = async function (post_id) {
    const post = await this.findOneAndDelete({_id: post_id})

    if (!post) throw Error("No such post")

    return post
}

postSchema.statics.rate = async function (post_id, user_id, rating) {
    try {
        const user = await User.findById(user_id)
        const postIndex = user.playedPosts.findIndex(postEntry => postEntry.post.toString() === post_id.toString())
        if (user.playedPosts[postIndex].hasLiked == true) throw Error("User already liked post")
        else user.playedPosts[postIndex].hasLiked = true

        await user.save()

        const post = await this.findById(post_id)
        if (parseInt(rating) === 1) post.likes ++
        else post.dislikes ++

        await post.save()

    }
    catch (error) {
        throw Error(error.message)
    }
}

module.exports = mongoose.model('Post', postSchema)