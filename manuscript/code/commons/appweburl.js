// Providing a string directly instead of using the internal ShareCoffee logic
ShareCoffee.Commons.loadAppWebUrlFrom = "https://sample.sharepoint.com/appweburl";
var myAppWebUrl = ShareCoffee.Commons.getAppWebUrl();

console.log(myAppWebUrl);

// will print "https://sample.sharepoint.com/appweburl"

// Providing a method which has to return the AppWeb url as String
ShareCoffee.Commons.loadAppWebUrlFrom = function(){
    // load AppWeb url form somewhere else
    return "https://sample.sharepoint.com/appweburl2";
};
var myAppWebUrl = ShareCoffee.Commons.getAppWebUrl();

console.log(myAppWebUrl);

// will print "https://sample.sharepoint.com/appweburl2"    