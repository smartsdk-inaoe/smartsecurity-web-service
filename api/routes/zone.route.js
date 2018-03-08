'use strict';

var express     = require('express');
var app         = express.Router();

//Import the controllers
var zoneController = require('../controllers/zone.controller');

app.post('/zone', zoneController.addZone);
app.post('/zone/delete', zoneController.deleteZone);
app.get('/zone', zoneController.getByIdZone);
app.get('/zone/getAllActive', zoneController.getAllActive);
app.get('/zone/getAllInactive', zoneController.getAllInactive);

module.exports = app;