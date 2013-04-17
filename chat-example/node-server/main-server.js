"use strict";

var wire = require("wire");

wire({
	server: {module: './server', rmi:"server"},

	plugins:[{module: './wire-remote'}]

}, {require:require}).then(function(ctx){
	console.log("running....");
}, function(err){console.error(err);});
