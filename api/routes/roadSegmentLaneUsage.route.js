'use strict';

var express     = require('express');
var app         = express();

//Import the controllers
var controller = require('../controllers/roadSegmentLaneUsage.controller');

app.route('/roadSegmentLaneUsage')
    .get(controller.getAll) // /zones?status =  1 || /zones?status=0
    .post(controller.add)  
app.route('/roadSegmentLaneUsage/:idRoadSegmentLaneUsage')
    .get(controller.getById)
    .put(controller.update)
    .delete(controller.delete)

module.exports = app;