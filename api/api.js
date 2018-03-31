
var express     = require('express');
var app         = express();

var organizationRoute 	= require('./routes/organization.route');
var zoneRoute  			= require('./routes/zone.route');
var subzoneRoute		= require('./routes/subzone.route');
var roadRoute 			= require('./routes/road.route')
var roadSegmentRoute 	= require('./routes/roadSegment.route')
var roadSegmentLaneUsageRoute = require('./routes/roadSegmentLaneUsage.route') 

app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to API REST Web Apilication' });
});

app.use(organizationRoute);
app.use(zoneRoute);
app.use(subzoneRoute);
app.use(roadRoute)
app.use(roadSegmentRoute)
app.use(roadSegmentLaneUsageRoute)

module.exports = app;