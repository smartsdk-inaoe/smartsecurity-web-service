
var Subzone = require('../../DataModelsAPI/models/subzone.model');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')
var fetch = require('node-fetch')
const { DateTime } = require('luxon');
var context = require('../../config/config').context

exports.getHistory = async function (req,res) {

    await Subzone.findOne({where : { 'idSubzone': req.params.idSubzone }})
    .then( async (subzone) => {
	  	if (subzone != null){

			let queryToCount = ngsi.createQuery({
				id: "Alert:Device_Smartphone_.*",
				type : "Alert",
				options : "count",
				georel :"coveredBy",
				geometry:"polygon",
				coords : subzone.location
            });

            await fetch(`http://${context.host}:${context.port}/${context.v}/entities${queryToCount}`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
			})
			.then(async (response) => {
                let off = Number(response["headers"]["_headers"]["fiware-total-count"][0])  
                
				let params  = {
					id: "Alert:Device_Smartphone_.*",
					type : "Alert",
					options : "keyValues",
					georel :"coveredBy",
					geometry:"polygon",
					coords : subzone.location,
					limit : "10",
                }
				if (off > 10){
					params.offset = off - 10
				}
                let query = ngsi.createQuery(params);
                console.log(query)
				await cb.getWithQuery(query)
				.then((result) => {
					if (result.length > 0){
						res.status(200).json(result)
					}else{
						res.status(200).json({})
					}
				})
				.catch((error) =>{
					res.status(500).send(error);
                })
			})
			.catch((error) =>{
				res.status(500).send(error);
			})
				
	  	}  	
	});
} 

exports.getCurrent = async function (req,res) {
    await Subzone.findOne({where : { 'idSubzone': req.params.idSubzone }})
    .then( async (subzone) => {
	  	if (subzone != null){

			var dt = DateTime.local();
			let midnight = dt.minus({ days: 1 }).endOf('day');

			let queryToCount = ngsi.createQuery({
				id: "Alert:Device_Smartphone_.*",
				type : "Alert",
				options : "count",
				georel :"coveredBy",
				geometry:"polygon",
				coords : subzone.location,
				dateObserved: `>=${midnight}`
            });

            await fetch(`http://${context.host}:${context.port}/${context.v}/entities${queryToCount}`, {
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
                },
			})
			.then(async (response) => {

				let count = Number(response["headers"]["_headers"]["fiware-total-count"][0])  
				if (count < 20) {
					count = 20;
				}

				let query = ngsi.createQuery({
					id: "Alert:Device_Smartphone_.*",
					type : "Alert",
					options : "keyValues",
					georel :"coveredBy",
					geometry:"polygon",
					coords : subzone.location,
					dateObserved: `>=${midnight}`,
					limit : count,
				});

				await cb.getWithQuery(query)
				.then((result) => {
					if (result.length > 0){
						res.status(200).json(result)
					}else{
						res.status(200).json({})
					}
				})
				.catch((error) =>{
					res.status(500).send(error);
				})
				
			})
			.catch((error) =>{
				res.status(500).send(error);
			})	
	  	}  	
	});
} 









