define([], function(){

"use strict";



var Client = {};

Client.start = function(server)/*@PostConstruct @Autowired*/{
	server.registerClient(this);
  this.server = server;
};

Client.sendMessage = function(evt, /*@Autowired("dom!message")*/msg)/*@On("dom!send", "click")*/{
  this.server.sendMessage(msg.value);
};

Client.onMessage = function(msg, /*@Autowired("dom!chat")*/chat){
	chat.value += ">"+ msg + "\n";
};




return Client;
});