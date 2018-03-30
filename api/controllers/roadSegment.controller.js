'use strict';

var roadSegment = require('../models/roadSegment.model')
var context = require('../context')

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}

exports.add = async function (req, res){
	var body = req.body;
	let type = "RoadSegment";
	body[`id${type}`] = `${type}_${Date.now()}`;

	// Cambios especificos al recibir el json
	body["location"] = body["location"].join(";")
    body["startPoint"] = body["startPoint"].join(",")
    body["endPoint"] = body["endPoint"].join(",")
	
	if (!isEmpty(body)) {
		roadSegment.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
            })
			data.location  = {
				type: "geo:polyline",
				value: data['location'].split(";")
            }
			context.create("RoadSegment", data, (status, entity) => {
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

exports.update = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){ 
		body["dateModified"] = new Date();
		roadSegment.update(body, {
			where: {
				idRoadSegment: req.params.idRoadSegment
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

exports.delete = function(req, res){
	roadSegment.update({
		status : 0,
		dateModified : new Date()
	}, {
		where: {
			idRoadSegment: req.params.idRoadSegment
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

exports.getAll = function(req,res){
	roadSegment.findAll({ where: req.query}).then(result => {
		// Cambiar para que se obtengan arreglos en lugar de text

		for (let item in result){
			let json = result[item]
			json.location = json.location.split(";")
			for( let item in json.location){
				json.location[item] = json.location[item].split(",")
				json.location[item][0] = Number(json.location[item][0])
				json.location[item][1] = Number(json.location[item][1])
			}
			result[item] = json
			console.log(json.centerPoint)
		}
		res.status(200).json(result);
	})
}

exports.getById = function (req, res){
	roadSegment.findById(req.params.idRoadSegment).then((result) => {
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
			
			res.status(200).json(json);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
}