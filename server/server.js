var express = require('express');
var loader = require('express-load');

// Create the main express app
var app = module.exports = express();

//as express req.param(name) is deprecated we are now using below module to read params 
app.use(require('request-param')());
// Boot the app (see boot.js), then use the very
// cool express-load utility to suck in all of the
// modules located under lib, models, collections, etc.

// and finally, start the server!
require('./boot')(app, function () {
	loader('lib')
		.then('models')
		.then('controllers')
		.then('routes')
		.into(app);
}, true);