'use strict';

var express     = require('express');
var app         = express();

//Import the controllers
var zoneController = require('../controllers/zone.controller');

//ROUTES
app.route('/zone')
    .get(zoneController.getAllZone)
    .post(zoneController.addZone);
app.get('/zone/actives', zoneController.getAllActive);
app.get('/zone/inactives', zoneController.getAllInactive);
app.route('zone/:idZOne')
    .get(zoneController.getByIdZone)
    .put(zoneController.updateZone)
    .delete(zoneController.deleteZone);


/*
app.post('/zone', zoneController.addZone);
app.post('/zone/delete', zoneController.deleteZone);
app.get('/zone', zoneController.getByIdZone);
app.get('/zone/getAllActive', zoneController.getAllActive);
app.get('/zone/getAllInactive', zoneController.getAllInactive);*/

module.exports = app;