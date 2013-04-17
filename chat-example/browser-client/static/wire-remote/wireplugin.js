/*jshint smarttabs:true */
"use strict";
(function(define) {
define(["when", "dnode", "shoe"], function(when, dnode, shoe) {

var dnodeServ = {};
var remoteContext = {};
var isConnected = null;

function setupDNodeServer(options){
	var port = options.port || 9999;
	var promise = when.defer();
	isConnected = promise.promise;
	
	
  if (options.shoe && options.server){
    
    var sock = shoe(function (stream) {
        dnodeServ = dnode(remoteContext);
        dnodeServ.pipe(stream).pipe(dnodeServ);
    });
    sock.install(options.server, options.shoe);
    console.log("starting dnode server at " + options.shoe);
  }
  else {//tcp only
     dnodeServ = dnode(remoteContext);
	   dnodeServ.listen(port);
     console.log("starting dnode server at " + port);
	}
  
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

function setupDNodeBrowser(options){
	var port = options.port || 9999;
	var promise = when.defer();
	isConnected = promise.promise;
	console.log("starting dnode browser client at " + options.shoe);
	
  var stream = shoe(options.shoe);
  
  var d = dnode();
  d.on('remote', function (ctx) {
      remoteContext = ctx;
      promise.resolve();
  });
  d.pipe(stream).pipe(d);
  
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



return {wire$plugin: function(ready, destroyed, options) {
							 
								//when(ready).then(function(){
								if (options.host !== undefined)
									setupDNodeClient(options);
								else if (options.server === undefined && options.shoe !== undefined)
                  setupDNodeBrowser(options);
                else
									setupDNodeServer(options);
										
								//});
							 
							 
                                return {factories: { 
											remote: remoteFactory
										}, 
										facets: {
											rmi: {ready: publishRemote}
										}};
                        }}; 
                        
                        
                        
                        
});})(typeof define == 'function'? define: function(deps, factory) {module.exports = factory.apply(this, deps.map(function(x) {return require(x);}));});

