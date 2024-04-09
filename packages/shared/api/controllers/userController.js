const User = require('../models/userModel')


// Login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    try {
        const user = await User.login(email, password)

        const id = user._id
        const username = user.username
        const verified = user.verified

        res.status(200).json({id, email, username, verified})
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

const sendEmail = async (req, res) => {
    const {email} = req.body

    try {
        const message = await User.sendemail(email)


        res.status(200).json({message: message})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const verify = async (req, res) => {
    const {email, code} = req.body

    try {
        const message = await User.verify(email, code)


        res.status(200).json({message: message})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const makeGuess = async (req, res) => {
    const {userid, postid, score, distanceAway, hasliked} = req.body

    try {
        const guess = await User.saveguess(userid, postid, score, distanceAway, hasliked)

        res.status(200).json({guess})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getGuesses = async (req, res) => {
    const {userid} = req.body
    
    try {
        const guesses = await User.getguesses(userid)

        res.status(200).json({guesses})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getUserById = async (req, res) => {
    const {userId} = req.body

    try {
        const username = await User.getUserById(userId);

        res.status(200).json({ username });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = {
    loginUser,
    signupUser,
    sendEmail,
    verify,
    makeGuess,
    getGuesses,
    getUserById
}
