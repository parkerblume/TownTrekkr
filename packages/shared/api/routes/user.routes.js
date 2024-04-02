const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// login route
router.get('/login', UserController.loginUser)

// signup route
router.post('/signup', UserController.signupUser)

// make guess
router.post('/makeguess', UserController.makeGuess)

// get guesses
router.post('/getguesses', UserController.getGuesses)


module.exports = router;