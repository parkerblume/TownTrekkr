const multer = require('multer');
const { GridFSBucket, ObjectId } = require('mongodb');

// Create GridFSBucket
let gfsBucket;

module.exports = function (app) {
    app.use((req, res, next) => {
        if (!gfsBucket) {
            const conn = require('mongoose').connection;
            gfsBucket = new GridFSBucket(conn.db, {
                bucketName: 'uploads'
            });
        }
        next();
    });

    // Set up Multer storage
    const storage = multer.memoryStorage();

    const upload = multer({ storage });

    // Endpoint for image upload
    app.post('/upload', upload.single('image'), async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        try {
            const fileId = new ObjectId();
            const uploadStream = gfsBucket.openUploadStreamWithId(fileId, req.file.originalname);
            uploadStream.end(req.file.buffer);

            uploadStream.on('error', (err) => {
                console.error('Error uploading file:', err);
                res.status(500).json({ message: 'Error uploading file' });
            });

            uploadStream.on('finish', () => {
                res.status(200).json({ message: 'File uploaded successfully', fileId });
            });
        } catch (err) {
            console.error('Error uploading file:', err);
            res.status(500).json({ message: 'Error uploading file' });
        }
    });
};
