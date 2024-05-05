const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// login route
router.post('/login', UserController.loginUser)

// signup route
router.post('/signup', UserController.signupUser)

// send verify email
router.post('/sendemail', UserController.sendEmail)

// verify code
router.post('/verify', UserController.verify)

// make guess
router.post('/makeguess', UserController.makeGuess)

// get guesses
router.post('/getguesses', UserController.getGuesses)

// get username by user id
router.post('/getuserbyid', UserController.getUserById)

// forget password
router.post('/forgetpassword', UserController.forgetPassword)

// reset password
router.post('/resetpassword/:token', UserController.resetPassword)


module.exports = router;