"use strict";

var wire = require("wire");




wire({

	server: {remote:"server"},
	client: {module: "./client"},
	
	
	plugins:[{module: '../../wire-remote', host: "http://localhost:9999"},
             {module: 'yaap/wire'}]

}, {require:require}).then(function(ctx){
	console.log("running....");
}, function(err){console.error(err);});
