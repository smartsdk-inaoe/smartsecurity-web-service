
const Sequelize = require('sequelize');

var sequelize = require('../db/sequelize');

var Zone = require('../models/zone.model')
var locations = require('./functions/locations')

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
	category: { 
		type: Sequelize.TEXT,
		set (category) {
			this.setDataValue('category', category.join(","));
		},
		get() {
			return this.getDataValue('category').split(',')
		}
		
	},
	location:{
		type: Sequelize.TEXT,
		allowNull: false,
		set (location) {
			this.setDataValue('location', location.join(";"));
		},
		get() {
			return locations.getPoly(this.getDataValue('location'))
		}
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