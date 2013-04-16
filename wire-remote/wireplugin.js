/*jshint smarttabs:true */
"use strict";

var dnode = require("dnode");
var when = require("when");



var dnodeServ = {};
var remoteContext = {};
var isConnected = null;

function setupDNodeServer(options){
	var port = options.port || 9999;
	var promise = when.defer();
	isConnected = promise.promise;
	console.log("starting dnode server at " + port);
	dnodeServ = dnode(remoteContext, function(ctx, con){
		console.log("new connection");
		console.log(this);
		console.log(arguments);
	});
	dnodeServ.listen(port);
	
	promise.resolve();

}


function setupDNodeClient(options){
	var port = options.port || 9999;
	var promise = when.defer();
	isConnected = promise.promise;
	console.log("starting dnode client (serverport: " + port + ")");
	dnode.connect(port, function(ctx, conn){
		remoteContext = ctx;
		promise.resolve();
	});
	


}

function remoteFactory(resolver, spec, wire){
	var name = spec.remote;

	when(isConnected).then(function(){
		console.log("remote connect: " +  name);
		console.log(remoteContext[name]);
		resolver.resolve(remoteContext[name]);
	});

}

function publishRemote(resolver, spec, wire){
//	console.log(spec.target);
	var name = spec.options;
	
	when(isConnected).then(function(){
		console.log("remote publish: " + name);
		remoteContext[name] = spec.target;
		resolver.resolve();
	});

}



module.exports = {wire$plugin: function(ready, destroyed, options) {
							 
								//when(ready).then(function(){
								if (options.host === undefined)
									setupDNodeServer(options);
								else
									setupDNodeClient(options);
										
								//});
							 
							 
                                return {factories: { 
											remote: remoteFactory
										}, 
										facets: {
											rmi: {ready: publishRemote}
										}};
                        }}; 