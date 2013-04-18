define([], function(){

console.log("spec loaded");

return {
  client: {module:'client'},
  
  server: {remote: 'server'},
  plugins:[
    {module: "wire-remote", shoe: "/dnode"}, 
    {module: "yaap/wire/wireplugin"},
    {module: "yaap/wire/html/wireplugin"},
    {module: "wire/dom"},
    {module: "wire/on"}]        
};

});