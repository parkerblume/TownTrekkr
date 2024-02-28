const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Incoming json
app.use(express.json());

// Routes -> defined in shared
app.use('/', require('./api/routes/routes.js'));

// Start the server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
