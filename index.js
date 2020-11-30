const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const socketIo = require('socket.io');
const logger = require('morgan');
require('events').EventEmitter.prototype._maxListeners = 0 //Avoiding memory leaks
require('dotenv').config();

//connecting to firestore
require('./database/firestore');

//connecting to Google OAuth configs
require('./config/passport-setup');

const app = express();
const port = 8000;

//Setting up Socket.Io
const server = http.createServer(app);
const io = socketIo(server);

//Connecting socket to client
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.emit('connection', null);
})

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

//route to create chat room
app.use(require('./routes/Chat')(io));

app.listen(port, console.log(`Server running on Port ${port}`));