const express = require('express');
const router = express.Router();
const multer = require('multer');

const UserController = require('../controllers/userController');
const PostController = require('../controllers/postController');

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

// create post route
router.post('/createpost', PostController.createPost)

// get post route
router.get('/getpost', PostController.getPost)

// get posts route
router.get('/getposts', PostController.getPosts)

// delete post route
router.delete('/deletepost', PostController.deletePost)

// multer stuffs
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads'); // Specify the directory where you want to store the uploaded files
		},
		filename: function (req, file, cb) {
			cb(null, Date.now() + '-' + file.originalname); // Use a unique filename to avoid overwriting
		},
	});
	  
	const upload = multer({ storage: storage });
	
// Express route for handling file uploads
router.post('/upload', upload.single('image'), (req, res) => {
	// Access uploaded file information using req.file
	if (!req.file) {
	return res.status(400).send('No file uploaded.');
	}

	res.send('File uploaded!');
});

module.exports = router;
