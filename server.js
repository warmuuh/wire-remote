"use strict";

var wire = require("wire");


var clients = [];

wire({

	svrBean: {literal: {
		registerClient: function(c){
			console.log(this);
			this.test = "a";
			clients.push(c);
		},
		sendMessage: function(msg){
			for(var i = 0; i < clients.length; ++i){
				clients[i].onMessage(msg);
			}
		}
	}, rmi:"server"},
	
	



	plugins:[{module: './wire-remote'}]

}, {require:require}).then(function(ctx){
	console.log("running....");

}, function(err){console.error(err);});
