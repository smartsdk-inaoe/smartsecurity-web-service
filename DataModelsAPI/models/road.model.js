
const Sequelize = require('sequelize');

//var sequelize = require('../utils/config');
var config = require('../../config/config');
var sequelize = config.sequelize;

var road = sequelize.define('Road', {
	idRoad : { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type : { 
		type: Sequelize.STRING,
		defaultValue: "Road"
	},
	name : {
		type : Sequelize.STRING,
		allowNull: false
    },
    description:{
        type: Sequelize.TEXT
    },
    responsible:{
        type: Sequelize.TEXT,
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
road.sync() 
module.exports = road;