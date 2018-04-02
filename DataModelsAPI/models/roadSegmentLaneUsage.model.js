const Sequelize = require('sequelize');

var sequelize = require('../db/sequelize');

var roadSegmentLaneUsage = sequelize.define('RoadSegmentLaneUsages', {
	idRoadSegmentLaneUsage : { 
		type : Sequelize.STRING(100), 
        primaryKey: true,
	},
	type: { 
		type: Sequelize.STRING,
		defaultValue: "RoadSegment"
	},
	idRoadSegment : {
		type : Sequelize.STRING(100),
		allowNull: false
	},
    lane_direction:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    lane_minimumAllowedSpeed:{
        type: Sequelize.INTEGER
    },
    lane_maximumAllowedSpeed:{
        type: Sequelize.INTEGER,
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
roadSegmentLaneUsage.sync() 
module.exports = roadSegmentLaneUsage;