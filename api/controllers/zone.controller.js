'use strict';
var zoneModel = require('../models/zone.model');
var zoneDAO = require('../dao/zone.dao');

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}

exports.addZone = function (req, res){
	var body = req.body;
	console.log(body);
	if (!isEmpty(body)) {
		var date = new Date();
		/*var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1; //Months are zero based
		var curr_year = d.getFullYear();
		var curr_hour = d.getHours();
		var curr_minute = d.getMinutes();
		var curr_seconds = d.getSeconds();*/
		zoneModel.name = body.name;
		console.log(zoneModel.name);
		zoneModel.address = body.address;
		zoneModel.category = body.category;
		zoneModel.location = JSON.stringify(body.location);
		zoneModel.centerPoint = JSON.stringify(body.centerPoint);
		zoneModel.refSubzones = body.refSubzones;
		zoneModel.owner = body.owner;
		zoneModel.dateCreated = date;
		zoneModel.dateModified = date;
		//zoneModel.dateCreated = curr_year + "/" + curr_month + "/" + curr_date + " " + curr_hour + ":" + curr_minute + ":" +curr_seconds;
		//zoneModel.dateModified = curr_year + "/" + curr_month + "/" + curr_date + " " + curr_hour + ":" + curr_minute + ":" +curr_seconds;

		if((zoneModel.name === null || /^\s*$/.test(zoneModel.name)) || (zoneModel.address === null || /^\s*$/.test(zoneModel.address)) || (zoneModel.location === null || /^\s*$/.test(zoneModel.location)) 
			|| (zoneModel.centerPoint === null || /^\s*$/.test(zoneModel.centerPoint)) || (zoneModel.owner === null || /^\s*$/.test(zoneModel.owner))){
			res.status(400).json({message: "Empty fields required"});
		}
		else{
			zoneDAO.addZone(zoneModel, async function(status, data){
				if(status === "success"){
					console.log(data);
					res.status(201).json(data);
				}
				else{
					res.status(400).json({message: "Error inserting"});
				}
			});
		}
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.updateZone = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){
		var date = new Date();
		/*var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1; //Months are zero based
		var curr_year = d.getFullYear();
		var curr_hour = d.getHours();
		var curr_minute = d.getMinutes();
		var curr_seconds = d.getSeconds();*/
		zoneModel.idZone = body.idZone;
		zoneModel.name = body.name;
		console.log(zoneModel.name);
		zoneModel.address = body.address;
		zoneModel.category = body.category;
		zoneModel.location = JSON.stringify(body.location);
		zoneModel.centerPoint = JSON.stringify(body.centerPoint);
		zoneModel.refSubzones = body.refSubzones;
		zoneModel.owner = body.owner;
		zoneModel.dateModified = date;
		//organizationModel.dateModified = curr_year + "/" + curr_month + "/" + curr_date + " " + curr_hour + ":" + curr_minute + ":" +curr_seconds;
		if((zoneModel.name === null || /^\s*$/.test(zoneModel.name)) || 
			(zoneModel.address === null || /^\s*$/.test(zoneModel.address))
			(zoneModel.category === null || /^\s*$/.test(zoneModel.category))
			(zoneModel.location === null || /^\s*$/.test(zoneModel.location))
			(zoneModel.centerPoint === null || /^\s*$/.test(zoneModel.centerPoint))
			(zoneModel.refSubzones === null || /^\s*$/.test(zoneModel.refSubzones))
			(zoneModel.owner === null || /^\s*$/.test(zoneModel.owner))
			(zoneModel.idZone === null || /^\s*$/.test(zoneModel.idZone)))
			{
			res.status(400).json({message: "Empty fields required"});
		}
		else{
			zoneDAO.updateZone(zoneModel, async function(status, data){
				if (status=="success" && !isEmpty(data)) {
					res.status(200).json(data);
				}
				else{
					res.status(404).json({message: "The entity cannot be updated"});
				}
			});
		}
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}
exports.deleteZone = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){
		var date = new Date();
		/*var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1; //Months are zero based
		var curr_year = d.getFullYear();
		var curr_hour = d.getHours();
		var curr_minute = d.getMinutes();
		var curr_seconds = d.getSeconds();*/
		zoneModel.idZone = body.idZone;
		zoneModel.status = 0;
		zoneModel.dateModified = date;
		//zoneModel.dateModified = curr_year + "/" + curr_month + "/" + curr_date + " " + curr_hour + ":" + curr_minute + ":" +curr_seconds;
		if((zoneModel.idZone === null || /^\s*$/.test(zoneModel.idZone))){
			res.status(400).json({message: "Empty fields required"});
		}
		else{
			zoneDAO.deleteZone(zoneModel, async function(status, data){
				if (status=="success" && !isEmpty(data)) {
					res.status(200).json(data);
				}
				else{
					res.status(404).json({message: "The entity cannot be updated"});
				}
			});
		}
	}else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.getAllActive = function (req, res){
	var status = 1;
	zoneDAO.getAllZone(status,async function(status, data){
		if(status=="success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred"});
		}
	});
}

exports.getAllInactive = function (req, res){
	var status = 0;
	zoneDAO.getAllZone(status, async function(status, data){
		if(status=="success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred"});
		}
	});
}
exports.getAllZone = function(req,res){
	organizationDAO.getAllZone(async function(status, data){
		if(status=="success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred"});
		}
	});
}
exports.getByIdZone = function (req, res){
	var query = req.query;
	if (!isEmpty(query)){
		var id = query.idZone;
		zoneDAO.getByIdZone(id, async function(status, data){
			if(status == "success"){
				res.status(200).json(data);
			}
			else{
				res.status(400).json({message: "An error has ocurred"});
			}
		});
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}