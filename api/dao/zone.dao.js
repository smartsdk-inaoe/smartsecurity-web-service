'use strict';
var db = require('../utils/config');

class ZoneDAO{
	addZone(zoneModel, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
		var sql = 'INSERT INTO zone (name, address, category, location, centerPoint, refSubzones, owner, dateCreated, dateModified) VALUES ?';
		var values = [[zoneModel.name, zoneModel.address, zoneModel.category, zoneModel.location, zoneModel.centerPoint, zoneModel.refSubzones, zoneModel.owner, zoneModel.dateCreated, zoneModel.dateModified]];
		console.log(values);
		connection.query(sql, [values], async function (err, result) {
			if (err) {
				callback("error", null);
			}else{
				zoneModel.idZone = result.insertId;
				callback("success", zoneModel);
			};
		});
		connection.end();
		}else{
			callback("error_connection", null);
		}
	}
	updateZone(zoneModel, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "UPDATE zone SET name = ?, address = ?, category = ?, location = ?, centerPoint = ?, refSubzones = ?, owner = ?, dateModified = ? WHERE idOrganization = ?";
			var values = [zoneModel.name, zoneModel.address, zoneModel.category, zoneModel.location, zoneModel.centerPoint, zoneModel.refSubzones, zoneModel.owner, zoneMdel.dateModified, zoneModel.idZone];
			connection.query(sql, values, async function(err, result){
				if (err) {
					callback("error", null);
				}else{
					if(result.affectedRows == 1){
						callback("success", result.affectedRows);
					}else{
						callback("not_found", result.affectedRows);
					}								
				}
			});
			connection.end();
		}else{
			callback("error_connection", null);
		}
	}
	deleteZone(zoneModel, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "UPDATE zone SET dateModified = ?, status = ? WHERE idZone = ?";
			var values = [zoneModel.dateModified, zoneModel.status, zoneModel.idZone];
			connection.query(sql, values, async function(err, result){
				if (err) {
					callback("error", null);
				}else{
					if(result.affectedRows == 1){
						callback("success", result.affectedRows);
					}else{
						callback("not_found", result.affectedRows);
					}								
				}
			});
			connection.end();
		}else{
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