'use strict';

var roadSegmentLaneUsage = require('../models/roadSegmentLaneUsage.model')
var context = require("./functions/context")

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}  

exports.add = function (req, res){
	var body = req.body;
	let type = "RoadSegmentLaneUsage";
	body[`id${type}`] = `${type}_${Date.now()}`;
	
	if (!isEmpty(body)) {
		roadSegmentLaneUsage.create(body)
		.then((result)=> {
			var data  = result.get({
				plain: true
			})
			context.create("RoadSegmentLaneUsage", data, (status, entity) =>{
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
		roadSegmentLaneUsage.update(body, {
			where: {
				idRoadSegmentLaneUsage: req.params.idOrganization
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
	roadSegmentLaneUsage.update({
		status : 0,
		dateModified :new Date()
	}, {
		where: {
			idRoadSegmentLaneUsage: req.params.idRoadSegmentLaneUsage
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
	roadSegmentLaneUsage.findAll({ where: req.query}).then(result => {
		res.status(200).json(result);
	})
}

exports.getById = function (req, res){
	roadSegmentLaneUsage.findById(req.params.idRoadSegmentLaneUsage).then((result) => {
		if (result){
			res.status(200).json(result.get({
				plain: true
			}));
		}else {
			res.status(400).json({message: "An error has ocurred", error: result});
		}
	})
}
