
var express     = require('express');
var app         = express();


var routes = require('./routes/index')

app.route('/')
	.get((req, res, next) => {res.json({ message: 'Welcome to Especial Services API' });
});

app.use(routes)

module.exports = app;