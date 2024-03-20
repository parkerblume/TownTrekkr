const express = require('express');
const multer = require('multer');
const router = express.Router();

const UserController = require('../controllers/userController');
const PostController = require('../controllers/postController');
const TownController = require('../controllers/townController');

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// // Route for user registration (sign up)
// router.post('/register', UserController.register);

// login route
router.post('/login', UserController.loginUser)

// signup route
router.post('/signup', UserController.signupUser)

// create post route
router.post('/createpost', upload.single('image'), PostController.createPost)

// create town route
router.post('/createtown', TownController.createTown)

// get post route
router.get('/getpost', PostController.getPost)

// get posts route
router.get('/getposts', PostController.getPosts)

// delete post route
router.delete('/deletepost', PostController.deletePost)


module.exports = router;
