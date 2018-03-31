'use strict';

var organization = require('../models/organization.model')
var context = require("../context")

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}  

exports.add = function (req, res){
	var body = req.body;
	let type = "Organization";
	body[`id${type}`] = `${type}_${Date.now()}`;
	if (!isEmpty(body)) {
		organization.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
			})
			context.create("Organization", data, (status, entity) =>{
				if(status){
					res.status(201).json(entity);
				}
				else{
					res.status(400).json({message: "An error has ocurred to send the entity to ContextBroker"});
				}
			})
		})
		.catch(err => {
			res.status(400).json( err["errors"])
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
		organization.update(body, {
			where: {
				idOrganization: req.params.idOrganization
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
	organization.update({
		status : 0,
		dateModified :new Date()
	}, {
		where: {
			idOrganization: req.params.idOrganization
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

exports.getAll = function(req,res){
	organization.findAll({ where: req.query}).then(result => {
		res.status(200).json(result);
	})
}

exports.getById = function (req, res){
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
