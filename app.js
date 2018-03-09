'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var organizationRoute 	= require('./api/routes/organization.route');
var zoneRoute  			= require('./api/routes/zone.route');

//Configurar bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Test route to make sure everything is working (accessed at GET http://localhost:4005/api)
app.route('/api')
	.get((req, res, next) => {res.json({ message: 'Welcome to API RESTFul Web Application' });
});

app.use('/api', organizationRoute);
app.use('/api', zoneRoute);

module.exports = app;