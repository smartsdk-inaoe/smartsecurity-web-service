'use strict';
var db = require('../utils/config');
class Organization {

	save(organizationModel, callback){
		var date = new Date();
		organizationModel.dateCreated = date;
		organizationModel.dateModified = date;

		if((organizationModel.name === null || /^\s*$/.test(organizationModel.name) || organizationModel.name.length === 0)){
			callback("Empty fields required", null);
		}
		var connection = db.getConnection();
		connection.connect();
		if(connection){
		var sql = 'INSERT INTO organization (name, dateCreated, dateModified) VALUES ?';
		var values = [[organizationModel.name, organizationModel.dateCreated, organizationModel.dateModified]];
		connection.query(sql, [values], async function (err, result) {
			if (err) {
				callback("error", null);
			}else{
				organizationModel.idOrganization = result.insertId;
				callback("success", organizationModel);
			};
		});
		connection.end();
		}else{
			callback("error_connection", null);
		}
	}

	update( id ,organizationModel, callback){
		var date = new Date();
		organizationModel.dateModified = date;
		console.log(organizationModel.name)
		if((organizationModel.name === null || /^\s*$/.test(organizationModel.name)) || 
			(organizationModel.idOrganization === null || /^\s*$/.test(organizationModel.idOrganization))){
			callback("Empty fields required", null);
		}
		var connection = db.getConnection();
		connection.connect();
		
		if(connection){
			var sql = "UPDATE organization SET name = ?, dateModified = ? WHERE idOrganization = ?";
			var values = [organizationModel.name, organizationModel.dateModified, id];
			connection.query(sql, values, async function(err, result){
				console.log(result)
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

	delete(id, callback){
		var date =  new Date()
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "UPDATE organization SET dateModified = ?, status = ? WHERE idOrganization = ?";
			var values = [date, 0, id];
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

	getAllOrganization(status, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = 'SELECT * FROM organization WHERE status = ?';
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

	getAllOrganizations(callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = 'SELECT * FROM organization';
			connection.query(sql, async function (err, result, fields) {
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

	getByIdOrganization(id, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "SELECT * FROM organization WHERE idOrganization = ? AND status = 1";
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

module.exports = new Organization();
