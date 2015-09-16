'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

 // Bootstrap db connection
 var db = mongoose.connect('mongodb://localhost/demoapp', function(err) {
 	if (err) {
 		console.error('Could not connect to MongoDB!');
 		console.log(err);
 	}
 });

// Init the express application
var app = require('./config/express')();

// Start the app by listening on <port>
app.listen(8080);

// Logging initialization
console.log('MEAN.JS application started on port ' + '8080');
