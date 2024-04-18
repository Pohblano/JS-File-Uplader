// Imports
const express = require('express');   //Express Web Server 
const bodyParser = require('body-parser'); //connects bodyParsing middleware
const path = require('path');     //used for file path
const io = require('./io');
const cors = require('cors')
const mongoose = require('mongoose');

// Routers
const socketRoutes = require('./routes/socketsRouter')
const fileRoutes = require('./routes/fileRouter')

// Express app
const app = express();

// Mongo database
mongoose.connect('mongodb://localhost:27017/fileUpload');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

// Attach routers
app.use(fileRoutes)
app.use("/chat",socketRoutes);


// Run server
const server = app.listen(5050, function () {
  console.log('Listening on port %d', server.address().port);
});
// // Connect socket io to server
io.attach(server);


