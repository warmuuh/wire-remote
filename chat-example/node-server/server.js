"use strict";

	
	
var clients = [];
module.exports = {
		registerClient: function(c){
			clients.push(c);
		},
		sendMessage: function(msg){
			for(var i = 0; i < clients.length; ++i){
				clients[i].onMessage(msg);
			}
		}

};