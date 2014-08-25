// inject a custom string
ShareCoffee.Commons.loadHostWebUrlFrom = "https://sample.sharepoint.com/sample";
var hostWebUrl = ShareCoffee.Commons.getHostWebUrl();

console.log(hostWebUrl);
// will print https://sample.sharepoint.com/sample"

// injecting a custom method
ShareCoffee.Commons.loadHostWebUrlFrom = function(){
   // load HostWeb url from somewhere else
   return "https://sample.sharepoint.com/sites/sample2";
};

var hostWebUrl = ShareCoffee.Commons.getHostWebUrl();
console.log(hostWebUrl);
// will print https://sample.sharepoint.com/sites/sample2"