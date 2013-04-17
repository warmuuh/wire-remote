define([], function(){

console.log("spec loaded");

return {
  client: {create:'client'},
  
  server: {remote: 'server'},
  plugins:[
    {module:'wire-remote/wireplugin', shoe: "/dnode"}, 
    {module: "yaap/wire/wireplugin"},
    {module: "yaap/wire/html/wireplugin"},
    {module: "wire/dom"},
    {module: "wire/on"}]        
};

});