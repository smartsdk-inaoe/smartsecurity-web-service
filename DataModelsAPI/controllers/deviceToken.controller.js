'use strict';

var deviceToken= require('../models/deviceToken.model')

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}  

exports.add = function (req, res){
	var body = req.body;
	let type = "DeviceToken";
	body[`id${type}`] = `${type}_${body["refDevice"]}`;

	if (!isEmpty(body)) {
		deviceToken.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
            })
            res.status(201).json(data);
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
		deviceToken.update(body, {
			where: {
				refDevice: req.params.refDevice
			}
		})
		.then((result) => {
			if(result[0] > 0){
				res.status(200).json(result);
			}else {
				res.status(404).json({message: "The entity cannot be updated", error: data});
			}
		})
		.catch(err => {
			res.status(400).json(err)
		})
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.delete = function(req, res){
	deviceToken.update({
		status : 0,
		dateModified :new Date()
	}, {
		where: {
			refDevice: req.params.refDevice
		}
	})
	.then((result) => {
		if(result[0] > 0){
			res.status(200).json(result);
		}else {
			res.status(404).json({message: "The entity cannot be updated"});
		}
	})
	.catch(err => {
		res.status(400).json(err)
	})
}

exports.getAll = function(req,res){
	deviceToken.findAll({ where: req.query}).then(result => {
		res.status(200).json(result);
	})
	.catch(err => {
		res.status(400).json(err)
	})
}

exports.getById = function (req, res){
	deviceToken.findById(req.params.refDevice).then((result) => {
		if (result){
			res.status(200).json(result.get({
				plain: true
			}));
		}else {
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
	.catch(err => {
		res.status(400).json(err)
	})
}
