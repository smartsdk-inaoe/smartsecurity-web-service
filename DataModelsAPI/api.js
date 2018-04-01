
var express     = require('express');
var app         = express();

var organizationRoute 	= require('./routes/organization.route');
var zoneRoute  			= require('./routes/zone.route');
var subzoneRoute		= require('./routes/subzone.route');
var roadRoute 			= require('./routes/road.route')
var roadSegmentRoute 	= require('./routes/roadSegment.route')
var roadSegmentLaneUsageRoute = require('./routes/roadSegmentLaneUsage.route') 
var deviceTokens = require('./routes/deviceTokens.route')

app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to DataModels API REST' });
});

app.use(organizationRoute);
app.use(zoneRoute);
app.use(subzoneRoute);
app.use(roadRoute)
app.use(roadSegmentRoute)
app.use(roadSegmentLaneUsageRoute)
app.use(deviceTokens)

module.exports = app;