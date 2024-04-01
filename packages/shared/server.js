const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const upload = require('./api/middleware/upload');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

mongoose.connect(process.env.MONGO_URL)

app.set('port', PORT);

// Incoming json
app.use(express.json());

// Routes -> defined in shared'
app.use('/', require('./api/routes/routes.js'));

// Unsafe but doing this so js can stop complaining
app.use((req, res, next) => {
	res.setHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline' 'unsafe-eval' http: https: data:;");
	next();
});


if (process.env.NODE_ENV === 'production')
{
	// Set static folder
	app.use(express.static('../web-app/build'));
	app.get('*', (req, res) =>{
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
	});
}


// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
})


//upload(app)
