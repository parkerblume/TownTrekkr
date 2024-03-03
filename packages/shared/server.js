const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const multer = require('multer');
const cors = require('cors');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
mongoose.connect(process.env.MONGO_URL)


app.set('port', PORT);

app.use(cors());

if (process.env.NODE_ENV === 'production')
{
	// Set static folder
	app.use(express.static('../web-app/build'));
	app.get('*', (req, res) =>
	{
	res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}

// Incoming json
app.use(express.json());

// Routes -> defined in shared
app.use('/', require('./api/routes/routes.js'));

// multer stuffs
const storage = multer.diskStorage({
destination: function (req, file, cb) {
	cb(null, 'uploads/'); // Specify the directory where you want to store the uploaded files
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname); // Use a unique filename to avoid overwriting
	},
});
  
const upload = multer({ storage: storage });

// Express route for handling file uploads
app.post('/upload', upload.single('image'), (req, res) => {
	// Access uploaded file information using req.file
	if (!req.file) {
	return res.status(400).send('No file uploaded.');
	}

	res.send('File uploaded!');
});


// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
