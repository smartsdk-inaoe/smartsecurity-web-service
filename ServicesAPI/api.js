
var express     = require('express');
var app         = express();
//var routes      = require('./routes/index'); //importing the routes
var config      = require('../config/config'); // get our config file
var alertsZone = require('./alerts/alertsZone')
var devicesZone = require('./devices/devicesZone')
var query = require('./especial/query').query

app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to Especial Services API' });
});

app.route('/alertsZone/history/:idZone')
	.get(alertsZone.getHistory)

app.route('/alertsZone/current/:idZone')
	.get(alertsZone.getCurrent)

app.route('/devicesZone/:idZone')
	.get(devicesZone.devicesZone)

app.route('/query')
	.post(query)

module.exports = app;