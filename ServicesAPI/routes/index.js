var express     = require('express');
var app         = express();

var alertsZone = require('../controllers/alertsZone')
var alertsSubzone = require('../controllers/alertsSubzone')
var devices = require('../controllers/devices')
var functions = require('../controllers/functions')

app.route('/alerts/zone/history/:idZone')
.get(alertsZone.getHistory)

app.route('/alerts/zone/current/:idZone')
.get(alertsZone.getCurrent)

app.route('/alerts/subzone/history/:idSubzone')
.get(alertsSubzone.getHistory)

app.route('/alerts/subzone/current/:idSubzone')
.get(alertsSubzone.getCurrent)

app.route('/devices/zone/:idZone')
.get(devices.getZone)

app.route('/devices/subzone/:idSubzone')
.get(devices.getSubzone)

app.route('/devices/zone/:idZone/owner')
.get(devices.getZoneByOwner)

app.route('/query')
.post(functions.query)

app.route('/zone/point')
.post(functions.pointCampus)


module.exports = app;