


var http = require('http');
var shoe = require('shoe');
var ecstatic = require('ecstatic')(__dirname + '/static');
var dnode = require('dnode');

var serv = http.createServer(ecstatic);
serv.listen(9999);


var wire = require('wire');

wire({
  server: {module:'./server', rmi:'server'},
  
  
  plugins: [{module: '../../wire-remote', shoe: '/dnode', server: serv}]




}, {require:require}).then(function(ctx){
  console.log("running...");
}, function(err){console.log(err);});



/*
var sock = shoe(function (stream) {
    var d = dnode({server:{
        saySomething : function () {
            console.log("hello world");
        }
    }});
    d.pipe(stream).pipe(d);
});
sock.install(serv, '/dnode');
*/



