"use strict";

var prompt = require("prompt");


module.exports = {
		onMessage: function(msg){
			console.log(">"+msg + "\n");
		},
		start: function(server)/*@PostConstruct @Autowired*/{
		
			server.registerClient(this);
			prompt.start();
		
			(function loop(){
				prompt.get(['msg'], function (err, result) {
					if (err) { return onErr(err); }
					else{
						server.sendMessage(result.msg);
						process.nextTick(loop);
					}
				});
			})();

		  function onErr(err) {
		    console.log(err);
		    return 1;
		  }
			
		
		}
	};