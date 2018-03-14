'use strict';
var db = require('../utils/config');

class ZoneDAO{
	save(zoneModel, callback){
		var date = new Date();
		zoneModel.dateCreated = date;
		zoneModel.dateModified = date;
		//VALIDATIONS
		/*if((zoneModel.name === null || /^\s*$/.test(zoneModel.name) || zoneModel.name === undefined || zoneModel.name.length === 0) || 
			(zoneModel.address === null || /^\s*$/.test(zoneModel.address) || zoneModel.address === undefined || zoneModel.address.length === 0) ||
			(req.body.category === null || /^\s*$/.test(req.body.category) ||req.body.category.length === 0) ||
			(zoneModel.location === null || /^\s*$/.test(zoneModel.location) || zoneModel.location === undefined || zoneModel.location === 0) ||
			(zoneModel.centerPoint === null || /^\s*$/.test(zoneModel.centerPoint) || zoneModel.centerPoint === undefined || zoneModel.centerPoint === 0) || 
			(zoneModel.owner === null || /^\s*$/.test(zoneModel.owner) || zoneModel.owner === undefined || zoneModel.owner === 0)){
			callback("Empty fields required", null);
	 	}*/
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			//var sql = 'INSERT INTO zone (name, address, category, location, centerPoint, refSubzones, owner, dateCreated, dateModified) VALUES ?';
			//var values = [[zoneModel.name, zoneModel.address, zoneModel.category, zoneModel.location, zoneModel.centerPoint, zoneModel.refSubzones, zoneModel.owner, zoneModel.dateCreated, zoneModel.dateModified]];
			var sql = 'INSERT INTO zone SET ?';			
			connection.query(sql, zoneModel, async function (err, result) {
				if (err) {
					callback("error", err);
				}
				else{
					zoneModel.idZone = result.insertId;
					callback("success", zoneModel);
				};
			});
			connection.end();
			}
			else{
				callback("error_connection", err);
			}
	}
	update(id, zoneModel, callback){
		var date = new Date();
		zoneModel.dateModified = date;

		//VALIDATIONS
		/*if((zoneModel.name === null || /^\s*$/.test(zoneModel.name) || zoneModel.name === undefined || zoneModel.name.length === 0) || 
		   (zoneModel.address === null || /^\s*$/.test(zoneModel.address) || zoneModel.address === undefined || zoneModel.address.length === 0) ||
		   (zoneModel.location === null || /^\s*$/.test(zoneModel.location) || zoneModel.location === undefined || zoneModel.location === 0) ||
		   (zoneModel.centerPoint === null || /^\s*$/.test(zoneModel.centerPoint) || zoneModel.centerPoint === undefined || zoneModel.centerPoint === 0) || 
		   (zoneModel.owner === null || /^\s*$/.test(zoneModel.owner) || zoneModel.owner === undefined || zoneModel.owner === 0) ||
		   (zoneModel.category === null || /^\s*$/.test(zoneModel.category) || zoneModel.category.length === 0) ||
		   (zoneModel.refSubzones === null || /^\s*$/.test(zoneModel.refSubzones) || zoneModel.refSubzones.length === 0)){
			callback("Empty fields required", null);
		}*/

		var connection = db.getConnection();
		connection.connect();
		if(connection){
			//var sql = "UPDATE zone SET name = ?, address = ?, category = ?, location = ?, centerPoint = ?, refSubzones = ?, owner = ?, dateModified = ? WHERE idZone = ?";
			//var values = [zoneModel.name, zoneModel.address, zoneModel.category, zoneModel.location, zoneModel.centerPoint, zoneModel.refSubzones, zoneModel.owner, zoneMdel.dateModified, id];
			var sql = "UPDATE zone SET ? WHERE idZone = ?";
			var values = [zoneModel, id];
			connection.query(sql, values, async function(err, result){
				if (err) {
					callback("error", null);
				}
				else{
					if(result.affectedRows == 1){
						callback("success", result.affectedRows);
					}
					else{
						callback("not_found", result.affectedRows);
					}								
				}
			});
			connection.end();
		}
		else{
			callback("error_connection", null);
		}
	}
	delete(id, zoneModel, callback){

		var date = new Date();

		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "UPDATE zone SET dateModified = ?, status = ? WHERE idZone = ?";
			var values = [date, 0, id];
			connection.query(sql, values, async function(err, result){
				if (err) {
					callback("error", null);
				}
				else{
					if(result.affectedRows == 1){
						callback("success", result.affectedRows);
					}
					else{
						callback("not_found", result.affectedRows);
					}								
				}
			});
			connection.end();
		}
		else{
			callback("error_connection", null);
		}
	}

	getAllZone(status, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = 'SELECT * FROM zone WHERE status = ?';
			var values = [[connection.escape(status)]]
			connection.query(sql, [values], async function (err, result, fields) {
			    if (err){
			    	callback("error", null);
			    }else{
			    	callback("success", result);
			    }
		  	});
		  	connection.end();
		}else{
			callback("error_connection", null);
		}
	}

	getAllZones(callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = 'SELECT * FROM zone';
			//var values = [[connection.escape(status)]]
			connection.query(sql, async function (err, result, fields) {
			    if (err){
			    	callback("error", null);
			    }else{
			    	callback("success", result);
			    }
		  	});
		  	connection.end();
		}
		else{
			callback("error_connection", null);
		}
	}
	getByIdZone(id, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "SELECT * FROM zone WHERE idZone = ? AND status = 1";
			var values = [[id]]
			connection.query(sql, [values], async function (err, result, fields) {
				
			    if (err){
			    	callback("error", null);
			    }else{
			    	callback("success", result);
			    }
		  	});
		  	connection.end();
		}else{
			callback("error_connection", null);
		}
	}
}

module.exports = new ZoneDAO();