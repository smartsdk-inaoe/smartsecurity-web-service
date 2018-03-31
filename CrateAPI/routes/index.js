'use strict';

  var express     = require('express')
  var app         = express();
  //Import the controllers
  var deviceController   = require('../controllers/device.controller');
  // Test route to make sure everything is working (accessed at GET http://localhost:4000/api)
  app.get('/', (req, res, next) => {
    res.json({ message: 'Welcome to CRATEDB-QuamtumLeap API' })
  });
  //EXAMPLE-SIMPLE GET REQUEST: http://localhost:3700/api/locationDate?date=2018-02-08
  //app.get('/locationDate/:date', deviceController.read_devicesByDate);
  //EXAMPLE-SIMPLE GET REQUEST: http://localhost:3700/api/locationOwnerDate?owner=41&date=2018-02-08
  app.get('/locationOwnerDate', deviceController.read_deviceByOwner);
  //EXAMPLE-SIMPLE GET REQUEST: http://localhost:3700/api/locationDeviceDate?idDevice=Device_Smartphone_b0234f7b3f365bf3&date=2018-02-08
  app.get('/locationDeviceDate', deviceController.read_deviceByIdDevice);
  //EXAMPLE-SIMPLE GET REQUEST: http://localhost:3700/api/locationOwnerDateTime?owner=41&date=2018-02-08&time=12
  app.get('/locationOwnerDateTime', deviceController.read_deviceByOwnerDateTime);
  //EXAMPLE-SIMPLE GET REQUEST: http://localhost:3700/api/locationDeviceDateTime?idDevice=Device_Smartphone_b0234f7b3f365bf3&date=2018-02-08&time=12
  app.get('/locationDeviceDateTime', deviceController.read_deviceByDeviceDateTime);

module.exports = app;