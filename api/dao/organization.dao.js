'use strict';
var db = require('../utils/config');
class OrganizationDAO {

	addOrganization(organizationModel, callback){
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

	updateOrganization(organizationModel, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "UPDATE organization SET name = ?, dateModified = ? WHERE idOrganization = ?";
			var values = [organizationModel.name, organizationModel.dateModified, organizationModel.idOrganization];
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

	deleteOrganization(organizationModel, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "UPDATE organization SET dateModified = ?, status = ? WHERE idOrganization = ?";
			var values = [organizationModel.dateModified, organizationModel.status, organizationModel.idOrganization];
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
			//var values = [[connection.escape(status)]]
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

module.exports = new OrganizationDAO();
