'use strict';

var express 	= require('express');
var bodyParser 	= require('body-parser');
var morgan 		= require('morgan');
var cors 		= require('cors')

var app = express();

var dataModelsApi 	= require('./DataModelsAPI/api')
var crateApi 		= require('./CrateAPI/api')
var servicesApi = require('./ServicesAPI/api')

//Configurar bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors())

app.use('/api', dataModelsApi)
app.use('/crate', crateApi)
app.use('/services', servicesApi)

var port = process.env.PORT || 4005;

app.listen(port, function(){
	console.log(" Servidor del api rest escuchando en http://localhost:" + port);
});