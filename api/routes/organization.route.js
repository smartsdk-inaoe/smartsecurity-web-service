'use strict';

var express     = require('express');
var app         = express();

//Import the controllers
var organizationController = require('../controllers/organization.controller');

app.route('/organization')
    .get(organizationController.getAllOrganization) // /zones?status =  1 || /zones?status=0
    .post(organizationController.addOrganization)  
app.route('/organization/:idOrganization')
    .get(organizationController.getByIdOrganization)
    .put(organizationController.updateOrganization)
    .delete(organizationController.deleteOrganization)


module.exports = app;