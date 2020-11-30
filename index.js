const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const logger = require('morgan');
require('events').EventEmitter.prototype._maxListeners = 0 //Avoiding memory leaks
require('dotenv').config();

//connecting to firestore
require('./database/firestore');

//connecting to Google OAuth configs
require('./config/passport-setup');

const app = express();
const port = 8000;

//middlewares
app.use(bodyParser.urlencoded({ encoded: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

//logger
app.use(logger('dev'));

//routes for auth
app.use(require('./routes/auth'));

app.listen(port, console.log(`Server running on Port ${port}`));