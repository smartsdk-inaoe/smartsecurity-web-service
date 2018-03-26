
var sequelize = require('../utils/config');
var organization = require('../models/organization.model')
//organization.sync({force: true})

class Organization {

	save(organizationModel, callback){
		organization.create(organizationModel)
		.then((result)=> {
			callback("success" ,result.get({
				plain: true
			  }))
		})
	}

	update(id ,organizationModel, callback){
		organizationModel["dateModified"] = new Date();
		organization.update(organizationModel, {
			where: {
				idOrganization: Number(id)
			}
		})
		.then((result) => {
			if(result[0] > 0){
				callback("success",result)
			}else {
				callback("not_found", result[0]);
			}
		})
	}

	delete(id, callback){
		organization.update({
			status : 0,
			dateModified :new Date()
		}, {
			where: {
				idOrganization: Number(id)
			}
		})
		.then((result) => {
			if(result[0] > 0){
				callback("success",result)
			}else {
				callback("not_found", result[0]);
			}
		})
	}

	getAllOrganizations(query, callback){
		organization.findAll({ where: query }).then(result => {
			callback("success", result);
		})
	}

	getByIdOrganization(id, callback){
		organization.findById(id).then((result) => {
			if (result){
				callback("success" ,result.get({
					plain: true
				}))
			}else {
				callback("failed" ,null)
			}
		})
	}
}

module.exports = new Organization();
