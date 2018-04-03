'use strict';

var User= require('../models/user.model')
var fetch = require('node-fetch')
var keyrock = require('../../config/config').keyrock

function isEmpty (object) {
    if (object == undefined ) return true;
    if (object == null) return true;
    if (object.length === 0)  return true;
    if (typeof object === 'string' && object === "") return true;
    return false;
}  

exports.add = function (req, res){
	var body = req.body;
	let type = "User";
	body[`id`] = `${type}_${Date.now()}`;
	if (!isEmpty(body)) {
		User.create(body)
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
		User.update(body, {
			where: {
				id: req.params.id
			}
		})
		.then((result) => {
			if(result[0] > 0){
				res.status(200).json(result);
			}else {
				res.status(404).json({message: "The user cannot be updated", error: data});
			}
		})
	}
	else{
		res.status(400).json({message: "Bad request"});
	}
}

exports.delete = function(req, res){
	User.update({
		status : 0,
		dateModified :new Date()
	}, {
		where: {
			id: req.params.id
		}
	})
	.then((result) => {
		if(result[0] > 0){
			res.status(200).json(result);
		}else {
			res.status(404).json({message: "The user cannot be updated"});
		}
	})
}

exports.getAll = function(req,res){
	User.findAll({ where: req.query}).then(result => {
		res.status(200).json(result);
	})
}

exports.getById = function (req, res){
	User.findById(req.params.id).then((result) => {
		if (result){
			res.status(200).json(result.get({
				plain: true
			}));
		}else {
			res.status(400).json({message: "Not found", error: result});
		}
	})
}

exports.keyLogin = (req, res) => {
	var params = req.body;
	var email = params.email;
	var name = params.email;
	var password = params.password;

	if(!isEmpty(email)){

		let payload  = {
			"auth": {
				"identity": {
					"methods": [
						"password"
					],
					"password": {
						"user": {
							"domain": {
								"id": "default"
							},
							"name": name,
							"password": password
						}
					}
				}
			}
		}

		var headers = {
			"accept": "application/json",
			"accept-encoding": "gzip, deflate",
			"accept-language": "en-US,en;q=0.8",
			"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36",
			"content-type": "application/json"
		
		}

		let options = {
			method: 'POST',
			headers: headers,
			body : JSON.stringify(payload)
		};
		console.log(`http://${keyrock}/v3/auth/tokens`)
		fetch(`http://${keyrock}/v3/auth/tokens`, options)
			.then(function(response) {              
				if(response.status >= 200 && response.status <= 208){

					User.findOne({where : { email : email}})
					.then((result) =>{
						let user = result.get({
							plain: true
						})
						let token = response.headers._headers['x-subject-token'][0];
						res.status(200).json({token : token, user})
					})
					.catch((err) => {
						res.status(404).json(err)
					})
					
				}else{
					res.status(404).send("The password you've entered is incorrect")
				}
			})
			.catch((err) => {
				console.error(err)
				res.status(404).send(err)
			});
	}else{
		res.status(400).json(["Empty fields required"]);
	}
} 
