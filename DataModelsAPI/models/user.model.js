
const Sequelize = require('sequelize');
var sequelize = require('../db/sequelize');

var user = sequelize.define('user', {
	id : { 
		type : Sequelize.STRING(100), 
		primaryKey: true,
    },
    refAffiliation   : {
		type: Sequelize.STRING(256),
		allowNull : false
	},
    firstName        : {
		type: Sequelize.STRING(200),
		allowNull : false
	},
    lastName         : {
		type : Sequelize.STRING(200),
		allowNull : false
	},
    email            : {
		type : Sequelize.STRING(100),
		allowNull : false
	},
    userName         : {
		type: Sequelize.STRING(50),
		allowNull : false
	},
    password         : {
		type : Sequelize.STRING(50),
		allowNull : false
	},
    address          : {
		type : Sequelize.STRING(200),
		allowNull : false
	},
    phoneNumber      : {
		type : Sequelize.STRING(20),
		allowNull : false
	},
	/*
  refDevices       : {
		type : Sequelize.STRING(50)
	},
    refVehicles      : {
		type : Sequelize.STRING(50)
	},
    registrationKey  : {
		type : Sequelize.STRING(200)
	},
    resetPasswordKey : {
		type : Sequelize.STRING(200)
	},
    registrationId   : {
		type: Sequelize.STRING(256)
	},
*/
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
},
{ freezeTableName: true});
user.sync() 
module.exports = user;