'use strict';

var subzone = require('../models/subzone.model')
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
	let type = "Subzone";
	body[`id${type}`] = `${type}_${Date.now()}`;

	
	if (!isEmpty(body)) {
		subzone.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
			})
			
			data['location'] = data['location'].join(';')
			data.location  = {
				type: "geo:polygon",
				value: data['location'].split(";")
			}
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
			res.status(400).json(err)
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

exports.delete = function(req, res){
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

exports.getAll = function(req,res){
	subzone.findAll({ where: req.query}).then(result => {
		res.status(200).json(result);
	})
}

exports.getById = function (req, res){
	subzone.findById(req.params.idSubzone).then((result) => {
		if(result){
			let json = result.get({
				plain: true
			})
			res.status(200).json(json);
		}
		else{
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
}