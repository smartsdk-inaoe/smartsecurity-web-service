'use strict';

var express     = require('express');
var app         = express();

//Import the controllers
var subzoneController = require('../controllers/subzone.controller');

//ROUTES
app.route('/subzone')
    .get(subzoneController.getAllSubzone) // /zones?status =  1 || /zones?status=0
    .post(subzoneController.addSubzone);
app.route('/subzone/:idSubzone')
    .get(subzoneController.getByIdSubzone)
    .put(subzoneController.updateSubzone)
    .delete(subzoneController.deleteSubzone);
    
module.exports = app;