

var wire = require('wire');

var http = require('http');
var shoe = require('shoe');
var ecstatic = require('ecstatic')(__dirname + '/static');
var dnode = require('dnode');

var serv = http.createServer(ecstatic);
serv.listen(9999);

wire({

  server: {module:'./server', rmi:'server'},
  plugins: [{module: '../../wire-remote', shoe: '/dnode', server: serv}]

}, {require:require}).then(function(ctx){
  console.log("running...");
}, function(err){console.log(err);});

