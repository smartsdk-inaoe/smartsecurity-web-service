
const Sequelize = require('sequelize');

var sequelize = require('../db/sequelize');
var locations = require('./functions/locations')

var deviceModel = sequelize.define('DeviceModel', {
	idDeviceModel { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
		defaultValue: "DeviceModel"
	},
	category: { 
        type: Sequelize.TEXT,
        allowNull: false	
    },
    brandName:{
        type: Sequelize.TEXT
    },
    manufacturerName:{
		type: Sequelize.TEXT
	},
	modelName:{
		type: Sequelize.TEXT
	},
	dateCreated: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
	},
	status: { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
});
device.sync() 
module.exports = device;