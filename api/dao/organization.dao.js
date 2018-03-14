'use strict';
var db = require('../utils/config');
class Organization {

	save(organizationModel, callback){
		var date = new Date();
		organizationModel.dateCreated = date;
		organizationModel.dateModified = date;

		//VALIDATIONS
		/*if((organizationModel.name === null || /^\s*$/.test(organizationModel.name) || organizationModel.name === undefined || organizationModel.name.length === 0)){
			callback("Empty fields required", null);
		}*/

		var connection = db.getConnection();
		connection.connect();
		if(connection){
		/*var sql = 'INSERT INTO organization (name, dateCreated, dateModified) VALUES ?';
		var values = [[organizationModel.name, organizationModel.dateCreated, organizationModel.dateModified]];*/
		var sql = 'INSERT INTO organization SET ?';
		connection.query(sql, organizationModel, async function (err, result) {
			if (err) {
				callback("error", err);
			}
			else{
				organizationModel.idOrganization = result.insertId;
				callback("success", organizationModel);
			};
		});
		connection.end();
		}
		else{
			callback("error_connection", err);
		}
	}

	update(id ,organizationModel, callback){

		var date = new Date();
		organizationModel.dateModified = date;
		console.log(organizationModel.name)

		var connection = db.getConnection();
		connection.connect();
		
		if(connection){
			
			var sql = "UPDATE organization SET ? WHERE idOrganization = ?";
			var values = [organizationModel, id];
			connection.query(sql, values, async function(err, result){
				console.log(result)
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

	delete(id, callback){
		var date =  new Date();
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

	getAllOrganizations(query, callback){
		var connection = db.getConnection();
		connection.connect();
		let parametersString ="";
		if (query !== {}){
			for (var key in query) {
				if (parametersString.length<=0) {
					parametersString = key + "=" + connection.escape(query[key]);
				}else{
					parametersString = parametersString + " AND " + key + "=" + connection.escape(query[key]);
				};						
			}
			if (parametersString !== "")
				parametersString = ' WHERE ' + parametersString;
		}
		if(connection){
			var sql = 'SELECT * FROM organization' + parametersString;
			connection.query(sql, async function (err, result, fields) {
			    if (err){
			    	callback("error", err);
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

	getByIdOrganization(id, callback){
		var connection = db.getConnection();
		connection.connect();
		if(connection){
			var sql = "SELECT * FROM organization WHERE idOrganization = ? AND status = 1";
			var values = [[id]]
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
}

module.exports = new Organization();
