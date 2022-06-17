// bring in dotenv
require('dotenv').config();
// bring in express framework
const express = require('express');
//bring in bodyParser
const bodyParser = require('body-parser');
const chemicalRoutes = require('./routes/chemicals');
const userRoutes = require('./routes/users');
// instantiate the application server
const app = express();
// use to serve static resources
app.use(express.static('public'));
// use to read the body data from the request
app.use(bodyParser.json());

app.use(chemicalRoutes);
app.use(userRoutes);

// port the express app is listening on
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
	console.log(`API server is listening on port ${PORT}`);
});
