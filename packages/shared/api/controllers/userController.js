const User = require('../models/userModel')


// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.login(email, password)

        const id = user._id
        const username = user.username

        res.status(200).json({id, email, username})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Signup user
const signupUser = async (req, res) => {
    const {email, password, username} = req.body

    try {
        const user = await User.signup(email, password, username)

        const id = user._id

        res.status(200).json({id, email, username})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}