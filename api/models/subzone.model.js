
const Sequelize = require('sequelize');

var sequelize = require('../utils/config');

var subzone = sequelize.define('Subzone', {
	idSubzone: { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type : { 
		type: Sequelize.STRING,
		defaultValue: "Building"
	},
	refBuildingType : { 
		type: Sequelize.STRING,
		defaultValue: "Subzone"
	},
	name : {
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
        type: Sequelize.TEXT,
        allowNull: false
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
module.exports = subzone;