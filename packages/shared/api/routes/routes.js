const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.get('/', function (req, res) {
	res.send('Hello World')
})
// // Route for user registration (sign up)
// router.post('/register', UserController.register);

module.exports = router;
