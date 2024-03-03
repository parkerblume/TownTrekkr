const multer = require('multer');

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
const uploadImage = async (req, res) => {
	// Access uploaded file information using req.file

	upload.single('image')(req, res, (err) => {
        // Handle multer errors
        if (err) {
            return res.status(500).send(err.message);
        }

        // Access uploaded file information using req.file
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        // Process metadata and file if needed
        //console.log(`Caption: ${caption}, Title: ${title}`);

        res.send('File uploaded!');
    });
};

module.exports = {
	uploadImage
}