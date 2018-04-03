
const Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

var User = sequelize.define('User', {
	id : { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
    },
    refAffiliation   : Sequelize.STRING(256),
    firstName        : Sequelize.STRING(200),
    lastName         : Sequelize.STRING(200),
    email            : Sequelize.STRING(100),
    userName         : Sequelize.STRING(50),
    password         : Sequelize.STRING(50),
    address          : Sequelize.STRING(200),
    phoneNumber      : Sequelize.STRING(20),
    refDevices       : Sequelize.STRING(50),
    refVehicles      : Sequelize.STRING(50),
    registrationKey  : Sequelize.STRING(200),
    resetPasswordKey : Sequelize.STRING(200),
    registrationId   : Sequelize.STRING(256),
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
},{ freezeTableName: true});
User.sync() 
module.exports = User;