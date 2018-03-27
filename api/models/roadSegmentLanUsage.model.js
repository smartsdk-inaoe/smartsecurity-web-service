const Sequelize = require('sequelize');

var sequelize = require('../utils/config');

var roadSegment_LaneUsage = sequelize.define('RoadSegmentLaneUsage', {
	idRoadSegment_LaneUsage : { 
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
        type: Sequelize.TEXT
    },
    lane_maximumAllowedSpeed:{
        type: Sequelize.TEXT,
    },
    lane_maximumAllowedHeight:{
        type: Sequelize.TEXT
    },
    lane_maximumAllowedWeight:{
        type: Sequelize.TEXT
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
module.exports = roadSegment_LanUsage;