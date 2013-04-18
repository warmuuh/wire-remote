#wire-remote
A plugin for [wire](https://github.com/cujojs/wire) to connect wire-contexts 'over the wire' ;P
(it uses [dnode](https://github.com/substack/dnode) for asynchronous rpc)

With that plugin, you can easily code interactions between server and client without hassling with REST, JSON-marshalling or similar. 
Just make your bean available for remote-access and thats it. Example:

```js
//server.js
module.exports = {
  doSomething: function(msg, cb){
    console.log(msg);
    cb("hello from server");
  }
}

//server-ctx.js
//this is the wire-context specification to make the server public
wire({
  server: {module: './server', rmi: 'server'},
  plugins: [{module: 'wire-remote'}]
})
```

With the `rmi:'server'` entry, the bean was published for remote-use. Now, on clientside, you can just use this bean as if the client/server barrier would not exist:

```js
//client-ctx.js
//this is the wire-context specification to access the server from the client.
wire({
  server: {remote: 'server'},
  plugins: [{module: 'wire-remote', host:'http://localhost:9999'}]
}).then(function(ctx){
  console.log("initialized");
  ctx.server.doSomething("hello from client", function(msg){
    console.log(msg);
  })
});
```
As you can see, the clientside aquires a remote-instance by `remote:'server'` and can then use it like a normal bean (Calling doSomething which resides at server side). 
The callback will be called on clientside! so the connection is bidirectional.
Output on server would be obviously: "Hello from client" while the output on client would be "hello from server". 


##Chat example
An example that demonstrates a simple chat with multiple clients and a single server is available:
  * node-2-node chat ([server](chat-example/node-server), [client](chat-example/node-client))
  * browser-chat ([server](chat-example/browser-client), [client](chat-example/browser-client/static))

These examples use [yaap](https://github.com/warmuuh/yaap) for wiring together references in a wire.js-context using annotations 
 (but this can also be done without annotations, but not that [elegant](chat-example/browser-client/static/client.js) :D)
