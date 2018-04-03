
const Sequelize = require('sequelize');

var sequelize = require('../db/sequelize');
var locations = require('./functions/locations')


var roadSegment = sequelize.define('roadSegment', {
	idRoadSegment : { 
		type : Sequelize.STRING(100), 
        primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
		defaultValue: "RoadSegment"
	},
	name : {
		type : Sequelize.STRING,
		allowNull: false
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
    refRoad:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    startPoint:{
        type: Sequelize.TEXT,
        allowNull: false,
        set (start) {
			this.setDataValue('startPoint', start.join(","));
		},
		get() {
			return locations.getPoint(this.getDataValue('startPoint'))
		}
    },
    endPoint:{
        type: Sequelize.TEXT,
        allowNull: false,
        set (end) {
			this.setDataValue('endPoint', end.join(","));
		},
		get() {
			return locations.getPoint(this.getDataValue('endPoint'))
		}
    },
    totalLaneNumber:{
        type: Sequelize.INTEGER
    },
    maximumAllowedSpeed:{
        type: Sequelize.INTEGER
    },
    minimumAllowedSpeed:{
        type: Sequelize.INTEGER
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
},
{ freezeTableName: true});
roadSegment.sync() 
module.exports = roadSegment;