// Load environment variables from .env file based on the current environment
require('dotenv').config({
   path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
});

// Importing necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

// Create an Express application
const app = express();

// Set up access log stream for logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' });

// Middleware setup
app.use(morgan('dev', { stream: accessLogStream }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Error handling middleware
const errorHandler = require('./middleware/errorHandlerMiddleware');

// Service to load initial data from CSV
const { loadCSVData } = require('./services/csvLoader');

// Server configuration
const port = process.env.PORT || 8080;
const routes = require('./routes');

// Mounting routes
Object.keys(routes).forEach((key) => {
   app.use(`/${key}`, routes[key]);
});

// Error handling route
app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
   // Load initial data from CSV file
   loadCSVData(path.join(__dirname, `./data/${process.env.FILENAME}`), (error) => {
      if (error) {
         console.error('failed to load csv data', error);
      }
   });
});

// Export the Express app for testing
module.exports = app;
