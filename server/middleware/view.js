const { GridFSBucket, ObjectId } = require('mongodb');
const mongoose = require('mongoose');


// Function to fetch and serve the image
const getImage = async (req, res) => {
    try {
        const conn = mongoose.connection;
        const gfsBucket = new GridFSBucket(conn.db, {
            bucketName: 'uploads'
        });

        const {fileId} = req.body; 

        // Check if fileId is valid
        if (!mongoose.Types.ObjectId.isValid(fileId)) {
            return res.status(400).json({ error: 'Invalid fileId' });
        }

        const fileStream = gfsBucket.openDownloadStream(new ObjectId(fileId)); // Fix this line
        fileStream.pipe(res); // Send the image file to the client
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getImage
};
