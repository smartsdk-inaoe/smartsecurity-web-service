
const Sequelize = require('sequelize');

var sequelize = require('../utils/config');
var Zone = require('../models/zone.model')

var subzone = sequelize.define('Subzone', {
	idSubzone: { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
		defaultValue: "Building"
	},
	refBuildingType : { 
		type: Sequelize.STRING,
		defaultValue: "Subzone"
	},
	name: {
		type : Sequelize.STRING,
		allowNull: false
	},
	category : { 
		type: Sequelize.TEXT
	},
	location:{
		type: Sequelize.TEXT,
		allowNull: false
    },
    refZone:{
		type: Sequelize.STRING(100),
		references: {
			// This is a reference to another model
			model: Zone,
			// This is the column name of the referenced model
			key: 'idZone',
		},
		allowNull: false,
    },
	dateCreated : { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	description: {
		type:Sequelize.TEXT
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
subzone.sync() 
module.exports = subzone;