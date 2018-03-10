'use strict';

var express     = require('express');
var app         = express();

//Import the controllers
var organizationController = require('../controllers/organization.controller');

app.route('/organization')
    .get(organizationController.getAllOrganization)
    .post(organizationController.addOrganization)
app.route('/organization/:idOrganization')
    .get(organizationController.getByIdOrganization)
    .put(organizationController.updateOrganization)
    .delete(organizationController.deleteOrganization)
app.get('/organization/actives', organizationController.getAllActive);
app.get('/organization/inactives', organizationController.getAllInactive);   

module.exports = app;