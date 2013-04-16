"use strict";

var wire = require("wire");




wire({

	svrBean: {literal: {
		doSomething: function(){console.log("Hello Server"); return "hh";}
	}, rmi:"server"},
	
	



	plugins:[{module: './wire-remote'}]

}, {require:require}).then(function(ctx){


	console.log("running....");
	console.log(ctx.svrBean);



}, function(err){console.error(err);});
