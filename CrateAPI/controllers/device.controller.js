'use strict';

var crate = require('node-crate');
var entidad;

exports.read_devicesByDate = function(req, res) {
    let date = req.params.date;
    console.log(date)
    crate.execute("select entity_id,location from etdevice where category=? and date_format(time_index) like ? group by entity_id",['smartphone',date+'%'])
    .then((result) => {
        console.log('Success', result.json, result.rowcount)
        entidad = result.json;
        res.status(200).json(entidad);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
};

exports.read_deviceByIdDevice = function(req, res) {
    let idDevice = req.query['idDevice'];
    let date = req.query['date'];

    crate.execute("select * from etdevice where entity_id=? and date_format(time_index) like ? order by date_format(time_index) desc limit 1",[idDevice, date+'%'])
    .then((result) => {
        console.log('Success', result.json, result.rowcount)
        entidad = result.json;
        res.status(200).json(entidad);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
};
//Ejemplo: Obtiene si un dispositivo con owner=41 se encontró en la fecha='2018-08-07'
exports.read_deviceByOwner = function(req, res) {
    let owner = req.query['owner'];
    let date = req.query['date'];

    crate.execute("select * from etdevice where owner=? and date_format(time_index) like ? order by date_format(time_index) desc limit 1",[owner, date+'%'])
    .then((result) => {
        console.log('Success', result.json, result.rowcount)
        entidad = result.json;
        res.status(200).json(entidad);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
};

exports.read_deviceByOwnerDateTime= function(req, res) {
    let owner = req.query['owner'];
    let date = req.query['date'];
    let time = req.query['time'];

    crate.execute("select * from etdevice where owner=? and date_format(time_index) like ? order by date_format(time_index) desc limit 1",[owner, date+'T'+time+'%'])
    .then((result) => {
        console.log('Success', result.json, result.rowcount)
        entidad = result.json;
        let coordinatesConverted = [];
        coordinatesConverted.push(entidad['location'][1], entidad['location'][0])
        entidad['location'] = coordinatesConverted
        res.status(200).json(entidad);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
};

exports.read_deviceByDeviceDateTime= function(req, res) {
    let device = req.query['idDevice'];
    let date = req.query['date'];
    let time = req.query['time'];

    crate.execute("select * from etdevice where entity_id=? and date_format(time_index) like ? order by date_format(time_index) desc limit 1",[device, date+'T'+time+'%'])
    .then((result) => {
        console.log('Success', result.json, result.rowcount)
        entidad = result.json;
        res.status(200).json(entidad);
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
};
