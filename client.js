"use strict";

var wire = require("wire");




wire({

	svrBean: {remote:"server"},
	clientBean: {literal: {
		doSomething: function(){console.log("Hello Client");}
	}, rmi:"client"},
	
	
	plugins:[{module: './wire-remote', host: "http://localhost:9999"}]

}, {require:require}).then(function(ctx){


	console.log("running....");
	var s = ctx.svrBean;
	var r = s.doSomething();
	console.log("returned: " + r);


}, function(err){console.error(err);});
