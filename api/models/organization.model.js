
const Sequelize = require('sequelize');

var sequelize = require('../utils/config');

var organization = sequelize.define('Organization', {
	idOrganization : { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type : { 
		type: Sequelize.STRING,
		defaultValue: "Organization"
	},
	name: {
		type : Sequelize.STRING,
		allowNull: false
	},
	dateCreated : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	dateModified : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW 
	},
	status : { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
});
organization.sync() 
module.exports = organization;