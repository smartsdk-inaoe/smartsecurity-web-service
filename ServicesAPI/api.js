
var express     = require('express');
var app         = express();
var routes      = require('./routes/index'); //importing the routes
var config      = require('../config/config'); // get our config file


// ROUTES FOR CRATE API
// ===================================================================

app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to Especial Services API' });
});
//app.use('/', routes);

module.exports = app;