'use strict';

var express     = require('express');
var app         = express();

//Import the controllers
var zoneController = require('../controllers/zone.controller');

//ROUTES
app.route('/zone')
    .get(zoneController.getAllZone) // /zones?status =  1 || /zones?status=0
    .post(zoneController.addZone);
app.route('zone/:idZone')
    .get(zoneController.getByIdZone)
    .put(zoneController.updateZone)
    .delete(zoneController.deleteZone);


module.exports = app;