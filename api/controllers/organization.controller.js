'use strict';

var organization = require('../dao/organization.dao');
var cb = require('ocb-sender');
var ngsi = require('ngsi-parser');

var organization = require('../models/organization.model')
//organization.sync({force: true})

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
		organization.create(body)
		.then(async (result)=> {
			var data  = result.get({
				plain: true
			})
			let idEntity = data.idOrganization;
			let typeEntity = "Organization";
			let NGSIentity = ngsi.parseEntity({
				id : `Organization_${idEntity}`,
				type : typeEntity,
				name: data.name,
				dateCreated: new Date(data.dateCreated),
				dateModified :new  Date(data.dateModified)		
			})
			await cb.createEntity(NGSIentity)
			.then((result) => {
				console.log(result)
				res.status(201).json(NGSIentity);	
			})
			.catch((err) => {
				console.log(err)
				res.status(400).json({message: "An error has ocurred to send the entity to ContextBroker"});
			})
		})
		.catch(err => {
			callback("failed", err["errors"])
		})

	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.updateOrganization = function(req, res){
	var body = req.body;
	if(!isEmpty(body)){ 

		body["dateModified"] = new Date();
		organization.update(body, {
			where: {
				idOrganization: Number(req.params.idOrganization)
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

exports.deleteOrganization = function(req, res){

	organization.update({
		status : 0,
		dateModified :new Date()
	}, {
		where: {
			idOrganization: Number(req.params.idOrganization)
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

exports.getAllOrganization = function(req,res){

	organization.findAll({ where: req.query}).then(result => {
		
		res.status(200).json(result);
	})
}

exports.getByIdOrganization = function (req, res){

	organization.findById(req.params.idOrganization).then((result) => {
		if (result){
			res.status(200).json(result.get({
				plain: true
			}));
		}else {
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
}