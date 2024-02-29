const User = require('../models/userModel')


// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.login(email, password)

        res.status(200).json({email})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        res.status(200).json({email})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}