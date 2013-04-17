define(['domready', 'shoe', 'dnode'], function(domready, shoe, dnode){

"use strict";



function Client(){

}

Client.prototype.onMessage = function(msg, /*@Autowired("dom!chat")*/chat){
	chat.value += ">"+ msg + "\n";
}

Client.prototype.start = function(server)/*@PostConstruct @Autowired*/{
	server.registerClient(this);
  this.server = server;
}



Client.prototype.sendMessage = function(evt, /*@Autowired("dom!message")*/msg)/*@On("dom!send", "click")*/{
  this.server.sendMessage(msg.value);
}




return Client;

});