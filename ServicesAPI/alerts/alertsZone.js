
var Zone = require('../../DataModelsAPI/models/zone.model');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')
var fetch = require('node-fetch')

exports.get = async function (req,res) {

    await Zone.findOne({where : { 'idZone': req.params.idZone }})
    .then( async (zone) => {
	  	if (zone != null){

			let queryToCount = ngsi.createQuery({
				id: "Alert:Device_Smartphone_.*",
				type : "Alert",
				options : "count",
				georel :"coveredBy",
				geometry:"polygon",
				coords : zone.location,
				//limit : "10",
				//dateObserved: `>=${fifteenAgo}`
            });
            //console.log(queryToCount)

            await fetch(`http://130.206.113.226:1026/v2/entities${queryToCount}`, {
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
					coords : zone.location,
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





