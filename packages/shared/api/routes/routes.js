const express = require('express');
const multer = require('multer');
const router = express.Router();

const UserController = require('../controllers/userController');
const PostController = require('../controllers/postController');
const TownController = require('../controllers/townController');
const View = require('../middleware/view')


// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// // Route for user registration (sign up)
// router.post('/register', UserController.register);

// login route
router.post('/login', UserController.loginUser)

// signup route
router.post('/signup', UserController.signupUser)

// make guess
router.post('/makeguess', UserController.makeGuess)

// Rate post route
router.post('/rate', PostController.ratePost)

// create post route
router.post('/createpost', upload.single('image'), PostController.createPost)

// get town route
router.get('/gettown', TownController.getTown)

// create town route
router.post('/createtown', TownController.createTown)

// add user to town route
router.post('/adduser', TownController.addUser)

// get post route
router.get('/getpost', PostController.getPost)

// get posts route
router.get('/getposts', PostController.getPosts)

// get image
router.get('/getimage', View.getImage)

// get guesses
router.post('/getguesses', UserController.getGuesses)

// delete post route
router.delete('/deletepost', PostController.deletePost)

// delete town route
router.delete('/deletetown', TownController.deleteTown)

module.exports = router;
