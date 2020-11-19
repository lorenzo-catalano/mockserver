var app = require('./app.js');
var http = require('http');

var port = +(process.env.SIMULATOR_PORT || 9087) 
http.createServer(app).listen(port,()=>{ console.log('HTTP listening on port '+port)});