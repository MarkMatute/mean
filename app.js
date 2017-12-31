const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');

const passport = require('passport');

// MONGOOOSE
mongoose.connect(config.database);
mongoose.connection.on('connected', () => {
  console.log('Connected to ' + config.database);
});
mongoose.connection.on('error', (error) => {
  console.log(error);
});

// EXPRESS
const app = express();

// USER ROUTES
const users = require('./routes/users')

// PORT
const port = 3000;

// CORS
app.use(cors());

// STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));

// BODY PARSER
app.use(bodyParser.json());

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
 
// Primary Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Users Routes
app.use('/users', users);

// 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port' + port);
});