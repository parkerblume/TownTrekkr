const express = require('express');
const multer = require('multer');
const router = express.Router();
const PostController = require('../controllers/postController');
const View = require('../middleware/view');

// Set up Multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Rate post route
router.post('/rate', PostController.ratePost)

// create post route
router.post('/createpost', upload.single('image'), PostController.createPost)

// get post route
router.post('/getpost', PostController.getPost)

// get posts route
router.get('/getposts', PostController.getPosts)

router.post('/getpostsbytown', PostController.getPostsByTown);

// get image
router.post('/getimage', View.getImage)

// delete post route
router.delete('/deletepost', PostController.deletePost)

module.exports = router;