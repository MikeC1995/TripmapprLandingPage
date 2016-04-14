'use strict';

// REQUIRE MODULES
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// CONFIGURE MODULES
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SET NODE ENVIRONMENT
var env = (process.env.NODE_ENV || "development");
// SET PORT NUMBER
var port = process.env.PORT || 8080;

// SERVE THE ANGULAR APP
app.use('/', express.static(__dirname + '/public'));

// STATICALLY SERVE DEPENDENCIES (node_modules) FOR USE BY CLIENT
// (ie. THIS METHOD HIDES THE SERVER STRUCTURE)
app.use('/npm_scripts', express.static('node_modules'));
app.use('/bower_scripts', express.static('bower_components'));

// 404 ERROR HANDLER
// This is the last piece of middleware to be wired up.
// If no routes matched, return a 404.
app.use(function(req, res, next) {
  res.status(404).send("Not Found");
});

// START THE SERVER
app.listen(port);
console.log('Magic happens on port ' + port);
