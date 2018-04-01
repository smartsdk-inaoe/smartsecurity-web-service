
var express     = require('express');
var app         = express();
//var routes      = require('./routes/index'); //importing the routes
var config      = require('../config/config'); // get our config file
var alertsZone = require('./alerts/alertsZone')

app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to Especial Services API' });
});

app.route('/alertsZone/:idZone')
	.get(alertsZone.get)

//app.use('/', routes);

module.exports = app;