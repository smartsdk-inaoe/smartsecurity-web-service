
const Sequelize = require('sequelize');

var sequelize = require('../utils/config');

var organization = sequelize.define('Organizations', {
	idOrganization : { 
		type : Sequelize.INTEGER, 
		primaryKey: true,
		autoIncrement: true 
	},
	type : { 
		type: Sequelize.STRING,
		 defaultValue: "Organization"
	},
	name : {
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
		type: Sequelize.INTEGER,
		 defaultValue: 1
	}
});
module.exports = organization;