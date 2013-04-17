"use strict";

	
	
var clients = [];
module.exports = {
		registerClient: function(c){
      console.log("new client registered");
      console.log(c);
			clients.push(c);
		},
		sendMessage: function(msg){
    console.log("new msg received: " + msg);
			for(var i = 0; i < clients.length; ++i){
				clients[i].onMessage(msg);
			}
		}

};