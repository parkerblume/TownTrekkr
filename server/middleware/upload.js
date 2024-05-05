const multer = require('multer');
const { GridFSBucket, ObjectId } = require('mongodb');

// Create GridFSBucket
let gfsBucket;


function handleUpload(req, res, file) {
    if (!gfsBucket) {
        const conn = require('mongoose').connection;
        gfsBucket = new GridFSBucket(conn.db, {
            bucketName: 'uploads'
        });
    }

    if (!file) {
        if (res) {
            return res.status(400).json({ message: 'No file uploaded' });
        } else {
            throw new Error('No file uploaded');
        }
    }

    return new Promise((resolve, reject) => {
        try {
            const fileId = new ObjectId();
            const uploadStream = gfsBucket.openUploadStreamWithId(fileId, file.originalname);
            uploadStream.end(file.buffer);

            uploadStream.on('error', (err) => {
                console.error('Error uploading file:', err);
                if (res) {
                    return res.status(500).json({ message: 'Error uploading file' });
                } else {
                    reject(new Error('Error uploading file'));
                }
            });

            uploadStream.on('finish', () => {
                if (res) {
                    return res.status(200).json({ message: 'File uploaded successfully', fileId });
                } else {
                    resolve(fileId);
                }
            });
        } catch (err) {
            console.error('Error uploading file:', err);
            if (res) {
                return res.status(500).json({ message: 'Error uploading file' });
            } else {
                reject(new Error('Error uploading file'));
            }
        }
    });
}


module.exports.handleUpload = handleUpload;
