'use strict';

var express     = require('express');
var app         = express.Router();

//Import the controllers
var organizationController = require('../controllers/organization.controller');

app.post('/organization', organizationController.addOrganization); //user POST
app.post('/organization/delete', organizationController.deleteOrganization);
app.get('/organization', organizationController.getByIdOrganization);
app.get('/organization/getAllActive', organizationController.getAllActive);
app.get('/organization/getAllInactive', organizationController.getAllInactive);
app.put('/organization', organizationController.updateOrganization);

module.exports = app;