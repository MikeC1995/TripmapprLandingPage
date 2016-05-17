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

// Check if XHTML is accepted
app.use(function(req, res, next) {
  var accepts = req.headers.accept.split(",");
  if (accepts.indexOf("application/xhtml+xml") >= 0) res.acceptsXHTML = true;
  next();
});
// SERVE THE ANGULAR APP, possibly delivering XHTML
app.use('/', express.static(__dirname + '/public', { setHeaders: deliverXHTML }));

// Deliver XHTML where appropriate
function deliverXHTML(res, path, stat) {
  if (ends(path, '.html') && res.acceptsXHTML) {
    res.header("Content-Type", "application/xhtml+xml");
  }
}
function ends(s, x) { return s.indexOf(x, s.length-x.length) >= 0; }

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
