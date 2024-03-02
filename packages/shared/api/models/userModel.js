const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    userPost : [
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    }
    ],
    // List of posts already played and respective score
    playedPosts : [
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
        score: {
            type: Number
        },
        hasLiked: {
            type: Boolean
        }
    }
    ]
})

// Static login method
userSchema.statics.login = async function(email, password, username) {
    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Incorrect email")
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error("Incorrect password")
    }

    return user
}


// Static signup method
userSchema.statics.signup = async function(email, password, username) {

    const emailExists = await this.findOne({ email })

    if (emailExists) {
        throw Error("Email already in use")
    }

    const usernameExists = await this.findOne({ username })

    if (usernameExists) {
        throw Error("Username already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash, username})

    return user

}


module.exports = mongoose.model('User', userSchema)