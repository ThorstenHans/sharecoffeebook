#ShareCoffee.CSOM

CSOM is a great way to access SharePoint data when you're running outside of SharePoint, currenly CSOM is offering more API endpoints and more capabilities as REST, but you've to learn CSOM because it's not a web-standard. This and the fact that CSOM is already providing a good API (if you've done any kind of SharePoint Server development before, you don't need much time to dig into CSOM APIs) are responsible for the small amount of CSOM extensions or abstractions offered by ShareCoffee.

T> ## Provider-Hosted Apps
T> If you're writing a Provider-Hosted App, you should review the
T> ShareCoffee.CrossDomain Namespace, there is also some small CSOM support inside of the CrossDomain Namespace.

## CSOM.getHostWeb()

When writing SharePoint-Hosted Apps you're often faced with the requirement to interact with data sitting in the HostWeb. You can use `ShareCoffee.CSOM.getHostWeb` in order to access data sitting in your HostWeb.

    var ctx = SP.ClientContext.get_current();
    // ctx is for working with your AppWeb

    var hostWebUrl = ShareCoffee.Commons.getHostWebUrl();
    var hostWeb = ShareCoffee.CSOM.getHostWeb(ctx, hostWebUrl);
    // hostWeb is the acutal hostweb

    var blogWebUrl = hostWebUrl + "/my-blog";
    var blogWeb = ShareCoffee.CSOM.getHostWeb(ctx, blogWebUrl);
