require('dotenv').config({
   path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
});

const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, './access.log'), { flags: 'a' });

app.use(morgan('dev', { stream: accessLogStream }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 8080;
const routes = require('./routes');

Object.keys(routes).forEach((key) => {
   // app.use(`/${key}`, routes[key]);
   app.use(`/`, routes[key]);
});

app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});
