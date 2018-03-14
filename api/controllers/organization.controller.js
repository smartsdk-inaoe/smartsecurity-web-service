'use strict';
var organizationModel = require('../models/organization.model');
var organization = require('../dao/organization.dao');
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

exports.addOrganization = function (req, res){
	var body = req.body;
	if (!isEmpty(body)) {
		organization.save(body, async function(status, data){
			if(status === "success"){
				console.log(data);
				let idEntity = data.idOrganization;
				let typeEntity = "Organization";
				let NGSIentity = ngsi.parseEntity({
					id : `Organization_${idEntity}`,
					type : typeEntity,
					name: data.name,
					dateCreated: new Date(data.dateCreated),
					dateModified :new  Date(data.dateModified)		
				})
				console.log(NGSIentity);
				//==============SEND THE ROAD ENTITY TO THE CONTEXTBROKER================
				await cb.createEntity(NGSIentity)
				.then((result) => {
					console.log(result)
					res.status(201).json(NGSIentity);	
				})
				.catch((err) => {
					console.log(err)
					res.status(400).json({message: "An error has ocurred to send the entity to ContextBroker"});
				})	
			}
			else{
				res.status(400).json({ message: "Error inserting", error: data});
			}
		});

	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.updateOrganization = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){
		organization.update( req.params.idOrganization ,body, async function(status, data){
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

exports.deleteOrganization = function(req, res){
	organization.delete( req.params.idOrganization, async function(status, data){
		if (status=="success" && !isEmpty(data)) {
			res.status(200).json(data);
		}
		else{
			res.status(404).json({message: "The entity cannot be updated"});
		}
	});
}

exports.getAllActive = function (req, res){
	var status = 1;
	organization.getAllOrganization(status, async function(status, data){
		if(status=="success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: data});
		}
	});
}

exports.getAllInactive = function (req, res){
	var status = 0;
	organization.getAllOrganization(status, async function(status, data){
		if(status=="success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: data});
		}
	});
}
exports.getAllOrganization = function(req,res){
	organization.getAllOrganizations(async function(status, data){
		if(status=="success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: data});
		}
	});
}
exports.getByIdOrganization = function (req, res){
	organization.getByIdOrganization(req.params.idOrganization, async function(status, data){
		if(status == "success"){
			res.status(200).json(data);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: data});
		}
	});	
}