const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const upload = require('./middleware/upload');

const postRoutes = require('./routes/post.routes');
const townRoutes = require('./routes/town.routes');
const userRoutes = require('./routes/user.routes');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });
mongoose.connect(process.env.MONGO_URI)

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

// Incoming json
app.use(express.json());

// Routes -> defined in shared'
app.use('/api/town', townRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);



// if (process.env.NODE_ENV === 'production')
// {
// 	// Set static folder
// 	app.use(express.static('../web-app/build'));
// 	app.get('*', (req, res) =>
// 	{
// 	res.sendFile(path.resolve(__dirname, '../web-app/build', 'index.html'));
// 	});
// }

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})


//upload(app)
