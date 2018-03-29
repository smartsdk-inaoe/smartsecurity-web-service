'use strict';
var cb = require('ocb-sender');
var ngsi = require('ngsi-parser');

var subzone = require('../models/subzone.model')
var context = require('../context')

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}

exports.addSubzone = async function (req, res){
	var body = req.body;
	let type = "Subzone";
	body[`id${type}`] = `${type}_${Date.now()}`;

	// Cambios especificos al recibir el json
	body["location"] = body["location"].join(";")
	body["category"] = body["category"].join(",")
	
	if (!isEmpty(body)) {
		subzone.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
			})
			//Cambios especificos para envíar al context
			data.location  = {
				type: "geo:polygon",
				value: data['location'].split(";"),
			}
			delete data.centerPoint
			data.category = data.category.split(",")
			
			context.create("Subzone", data, (status, entity) => {
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

exports.updateSubzone = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){ 
		body["dateModified"] = new Date();
		subzone.update(body, {
			where: {
				idSubzone: req.params.idSubzone
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

exports.deleteSubzone = function(req, res){
	subzone.update({
		status : 0,
		dateModified : new Date()
    }, 
    {
		where: {
			idSubzone: req.params.idSubzone
		}
	})
	.then((result) => {
		if(result[0] > 0){
			res.status(200).json(result);
		}else {
			res.status(404).json({message: "The entity cannot be updated"});
		}
	})
}

exports.getAllSubzone = function(req,res){
	subzone.findAll({ where: req.query}).then(result => {
		res.status(200).json(result);
	})
}

exports.getByIdSubzone = function (req, res){
	subzone.findById(req.params.idSubzone).then((result) => {
		if(result){
			res.status(200).json(result.get({
				plain: true
			}));
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
}