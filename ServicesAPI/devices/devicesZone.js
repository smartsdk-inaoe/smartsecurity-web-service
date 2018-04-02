const { DateTime } = require('luxon');
var Zone = require('../../DataModelsAPI/models/zone.model');
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

exports.devicesZone = async function (req,res) {
	await Zone.findOne({where : { 'idZone': req.params.idZone }})
    .then( async (zone) => {
	  	if (zone != null){
              
			var dt = DateTime.local();
            let fifteenAgo = dt.minus({ minutes: 15 });
            
			let query = ngsi.createQuery({
				id: "Device_Smartphone_.*",
				type : "Device",
				options : "keyValues",
				georel :"coveredBy",
				geometry:"polygon",
				coords : zone.location,
				dateModified: `>=${fifteenAgo}`
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
            
	  	}  	
	});
} 