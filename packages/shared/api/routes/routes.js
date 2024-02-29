const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.get('/', function (req, res) {
	res.send('Hello World')
	// This should call api endpoint that gets cards/photos
})
// // Route for user registration (sign up)
// router.post('/register', UserController.register);

// login route
router.post('/login', UserController.loginUser)


// signup route
router.post('/signup', UserController.signupUser)

module.exports = router;
