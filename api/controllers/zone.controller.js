'use strict';
var zoneModel = require('../models/zone.model');
var zoneDAO = require('../dao/zone.dao');
var cb = require('ocb-sender');
var ngsi = require('ngsi-parser');

// Configuration for the connection with the ContextBroker
cb.config('http://207.249.127.218',1026,'v2')

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}

exports.addZone = async function (req, res){
	var body = req.body;
	if (!isEmpty(body)) {	
		zoneDAO.save(body, async function(status, data){
			if(status === "success"){
				console.log(data);
				let locationConverted = body.location.split(";")
				console.log(data.centerPoint);
				let idEntity = data.idZone;
				let typeEntity = "Zone";
				let NGSIentity = ngsi.parseEntity({
					id : `Zone_${idEntity}`,
					type : typeEntity,
					name: data.name,
					address: data.address,
					category: data.category,
					location: {
						type: "geo:polygon",
						value: locationConverted,
						metadata:{
							centerPoint:{
								type: "geo:point",
								value: data.centerPoint
							}
						}
					},
					owner: "Organization_"+data.owner,
					dateCreated: new Date(data.dateCreated),
					dateModified :new  Date(data.dateModified)			
				})
				// =========SEND THE ROAD ENTITY TO THE CONTEXTBROKER=========
				await cb.createEntity(NGSIentity)
					.then((result) => {
						console.log(result)
						res.status(201).json(NGSIentity);	
					})
					.catch((err) => {
						console.log(err)
						res.status(400).json({message: "An error has ocurred to send the zone entity to the ContextBroker"});
					})	
				res.status(201).json(NGSIentity);	
			}
			else{
				res.status(400).json({message: "Error inserting", error: data});
			}
		});
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.updateZone = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){
		zoneDAO.update(req.params.idZone, body, async function(status, data){
			if (status=="success" && !isEmpty(data)) {
				res.status(200).json(data);
			}
			else{
				res.status(404).json({message: "The entity cannot be updated", error: data});
			}
		});
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}
exports.deleteZone = function(req, res){
	zoneDAO.delete(req.params.idZone, async function(status, data){
		if (status=="success" && !isEmpty(data)) {
			res.status(200).json(data);
		}
		else{
			res.status(404).json({message: "The entity cannot be updated", error: data});
		}
	});
}

exports.getAllZone = function(req,res){
	zoneDAO.getAllZones(req.query ,function(status, data){
		if(status=="success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: data["sqlMessage"]});
		}
	});
}
exports.getByIdZone = function (req, res){
	zoneDAO.getByIdZone(req.params.idZone, async function(status, data){
		if(status == "success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error:data});
		}
	});
}