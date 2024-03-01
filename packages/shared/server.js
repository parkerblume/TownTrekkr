const path = require('path');
const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const url = process.env.MONGODB_URL;
const MongoClient = require('mongodb').MongoClient; 
const client = new MongoClient(url);
client.connect();

app.set('port', PORT);

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

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
