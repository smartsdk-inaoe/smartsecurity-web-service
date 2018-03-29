'use strict';
var cb = require('ocb-sender');
var ngsi = require('ngsi-parser');

var zone = require('../models/zone.model')
var context = require('../context')

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}

exports.addZone = async function (req, res){
	var body = req.body;
	let type = "Zone";
	body[`id${type}`] = `${type}_${Date.now()}`;

	// Cambios especificos al recibir el json
	body["location"] = body["location"].join(";")
	body["centerPoint"] = body["centerPoint"].join(",")
	body["category"] = body["category"].join(",")
	
	if (!isEmpty(body)) {
		zone.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
			})
			//Cambios especificos para envíar al context
			data.location  = {
				type: "geo:polygon",
				value: data['location'].split(";"),
				metadata:{
					centerPoint:{
						value: data['centerPoint'],
						type: "geo:point"
					}
				}
			}
			delete data.centerPoint
			data.category = data.category.split(",")

			context.create("Zone", data, (status, entity) => {
				if(status){
					res.status(201).json(entity);
				}
				else{
					res.status(400).json({message: "An error has ocurred to send the entity to ContextBroker"});
				}
			})
		})
		.catch(err => {
			res.status(400).json(err["errors"])
		})
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.updateZone = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){ 
		body["dateModified"] = new Date();
		zone.update(body, {
			where: {
				idZone: req.params.idZone
			}
		})
		.then((result) => {
			if(result[0] > 0){
				res.status(200).json(result);
			}else {
				res.status(404).json({message: "The entity cannot be updated", error: data});
			}
		})
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.deleteZone = function(req, res){
	zone.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			idZone: req.params.idZone
		}
	})
	.then((result) => {
		if(result[0] > 0){
			res.status(200).json(result);
		}
		else {
			res.status(404).json({message: "The entity cannot be updated"});
		}
	})
}

exports.getAllZone = function(req,res){
	zone.findAll({ where: req.query}).then(result => {
		// Cambiar para que se obtengan arreglos en lugar de text

		for (let item in result){
			let json = result[item]
			json.location = json.location.split(";")
			for( let item in json.location){
				json.location[item] = json.location[item].split(",")
				json.location[item][0] = Number(json.location[item][0])
				json.location[item][1] = Number(json.location[item][1])
			}
			json.centerPoint = json.centerPoint.split(",")
			json.centerPoint[0] = Number(json.centerPoint[0]) 
			json.centerPoint[1] = Number(json.centerPoint[1]) 
			json.category = json.category.split(",")
			result[item] = json

			console.log(json.centerPoint)
		}
		

		res.status(200).json(result);
	})
}

exports.getByIdZone = function (req, res){
	zone.findById(req.params.idZone).then((result) => {
		if(result){
			let json = result.get({
				plain: true
			})
			json.location = json.location.split(";")
			for( let item in json.location){
				json.location[item] = json.location[item].split(",")
				json.location[item][0] = Number(json.location[item][0])
				json.location[item][1] = Number(json.location[item][1])
			}
			json.centerPoint = json.centerPoint.split(",")
			json.centerPoint[0] = Number(json.centerPoint[0]) 
			json.centerPoint[1] = Number(json.centerPoint[1]) 
			json.category = json.category.split(",")
			res.status(200).json(json);
			// Cambiar para que se obtengan arreglos en lugar de text
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
}