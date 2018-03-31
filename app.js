
var express     = require('express');
var app         = express();

var organizationRoute 	= require('./api/routes/organization.route');
var zoneRoute  			= require('./api/routes/zone.route');
var subzoneRoute		= require('./api/routes/subzone.route');
var roadRoute 			= require('./api/routes/road.route')
var roadSegmentRoute 	= require('./api/routes/roadSegment.route')
var roadSegmentLaneUsageRoute = require('./api/routes/roadSegmentLaneUsage.route') 

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