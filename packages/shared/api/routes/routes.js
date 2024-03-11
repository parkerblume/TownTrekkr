const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const PostController = require('../controllers/postController');

// // Route for user registration (sign up)
// router.post('/register', UserController.register);

// login route
router.post('/login', UserController.loginUser)


// signup route
router.post('/signup', UserController.signupUser)

// create post route
router.post('/createpost', PostController.createPost)

// get post route
router.get('/getpost', PostController.getPost)

// get posts route
router.get('/getposts', PostController.getPosts)

// delete post route
router.delete('/deletepost', PostController.deletePost)

module.exports = router;
