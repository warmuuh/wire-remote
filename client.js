"use strict";

var wire = require("wire");

var prompt = require("prompt");


wire({

	svrBean: {remote:"server"},
	client: {literal: {
		onMessage: function(msg){console.log("\n>"+msg + "\n");}
	}},
	
	
	plugins:[{module: './wire-remote', host: "http://localhost:9999"}]

}, {require:require}).then(function(ctx){

	console.log("running....");
	var s = ctx.svrBean;
	s.registerClient(ctx.client);

	
	
	prompt.start();
	
	(function loop(){
		prompt.get(['msg'], function (err, result) {
			if (err) { return onErr(err); }
			else{
				s.sendMessage(result.msg);
				process.nextTick(loop);
			}
		});
	})();

  function onErr(err) {
    console.log(err);
    return 1;
  }
  
  

	


}, function(err){console.error(err);});
