'use strict';
var db = require('../utils/config');

class ZoneDAO{ 
	save(zoneModel, callback){
		var date = new Date();
		zoneModel.dateCreated = date;
		zoneModel.dateModified = date;
		zoneModel["location"] = zoneModel["location"].join(";");
		zoneModel["centerPoint"] = zoneModel["centerPoint"].toString();
		var connection = db.getConnection();
		connection.connect();
		if(connection){
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
		var connection = db.getConnection();
		connection.connect();
		if(connection){
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
			var sql = 'SELECT * FROM organization WHERE status = ?';
			var values = [[connection.escape(status)]]
			connection.query(sql, [values], async function (err, result, fields) {
			    if (err){
			    	callback("error", null);
				}
				else{
			    	callback("success", result);
			    }
		  	});
		  	connection.end();
		}
		else{
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