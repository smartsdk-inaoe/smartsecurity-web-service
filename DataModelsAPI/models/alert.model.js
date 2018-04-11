const Sequelize = require('sequelize');

var sequelize = require('../db/sequelize');
var locations = require('./functions/locations');

var alert = sequelize.define('alert', {
	idAlert: { 
		type : Sequelize.STRING(100),  
		primaryKey: true,
	},
	type : { 
		type: Sequelize.STRING,
		defaultValue: "Alert"
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false
	},
	subCategory: {
		type : Sequelize.STRING,
		allowNull: false
	},
	location:{
		type: Sequelize.TEXT,
		allowNull: false,
		set(location) {
			this.setDataValue('location', location.join(";"));
		},
		get() {
			return locations.getPoly(this.getDataValue('location'))
		}
	},
	address:{
		type: Sequelize.TEXT
	},
	dateObserved: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW
  },
  validFrom: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW 
	},
	validTo: { 
		type: Sequelize.DATE, 
		defaultValue: Sequelize.NOW 
  },
  description: {
		type:Sequelize.TEXT
  },
  alertSource:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  data: {
    type: Sequelize.TEXT
  },
  severity: {
    type: Sequelize.STRING
  },
	status : { 
		type: Sequelize.CHAR(1),
		defaultValue: "1"
	}
},
{ freezeTableName: true});
module.exports = alert;