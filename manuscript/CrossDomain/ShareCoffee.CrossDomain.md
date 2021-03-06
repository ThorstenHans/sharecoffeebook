#ShareCoffee.CrossDomain

When building Provider Hosted Apps for SharePoint, most samples on MSDN are demonstrating how to communicate with SharePoint or Office 365 using server-side code either in Code-Behind files for ASP.NET WebForms or code located in controllers when talking about ASP.NET MVC. Using C# CSOM for communicating with SharePoint is common, but not the best choice for all the requirements. In these days users are considering fancy web applications, using client-side logic in order to make interactions fluent and smooth. SharePoint is offering a CrossDomain library for communication from such Provider Hosted Apps using JavaScript.

In order to get CrossDomain support for REST queries working, you've to reference a JavaScript file from the HostWeb. (You'll that later in this chapter). As soon as all the required scripts are loaded and referenced within your website, you've to use an instance of `SP.RequestExecutor` which is responsible for communicating with SharePoint's REST interface.

SP.RequestExecutor is injecting an hidden IFrame to your website. This hidden IFrame will load an ASPX page from your HostWeb which is responsible for handling all the CrossDomain requests by relying on HTML Post Messages. For you as an App developer, you've to use SP.RequestExecutor instances for executing REST requests in those scenarios.

## CrossDomain REST

### Manually activating CrossDomain Support for REST

As mentioned in the introduction, you've to reference the `SP.RequestExecutor.js` file from your HostWeb. The entire path to the script can be constructed like this:

`{SPHostUrl}/_layouts/15/SP.RequestExecutor.js`


### Activating CrossDomain Support for REST with ShareCoffee

ShareCoffee is abstracting this manual task. You can use `loadCrossDomainLibrary()` for loading the
`SP.RequestExecutor.js` file from the HostWeb.

If you're interested in, you can provide callbacks for success and failure to function as shown in the next code sample.

    var onLoaded = function(){
        console.log("SharePoint's CrossDomain Library for REST loaded");

        goAndReadDataFromTheAppWeb();
        goAndReadDataFromTheHostWeb();
    };

    var onErrorLoading = function(){
        console.log("Ouch! Something wen't wrong, can't load CrossDomain Library");
    };

    ShareCoffee.CrossDomain.loadCrossDomainLibrary(onLoaded,
       onErrorLoading);

### Detecting if CrossDomain Library is already loaded

ShareCoffee is internally tracking if it was able to load the CrossDomain library. Beside tracking this information, you can also use this property witihn your code. You can access this property by using

`ShareCoffee.CrossDomain.crossDomainLibrariesLoaded`


### CrossDomain CRUD Operations

As for plain REST requests is ShareCoffee also offering a fluent API for executing all the various CRUD operations in a CrossDomain environment.

    ShareCoffee.CrossDomain.build.create
    ShareCoffee.CrossDomain.build.read
    ShareCoffee.CrossDomain.build.update
    ShareCoffee.CrossDomain.build.delete
    ShareCoffee.CrossDomain.build.del

Because you've to use SPRequestExecutor in order to commuicate succesfully with SharePoint, there is only a single API available from this point

    ShareCoffee.CrossDomain.build.create.for.SPCrossDomainLib();
    ShareCoffee.CrossDomain.build.read.for.SPCrossDomainLib();
    ShareCoffee.CrossDomain.build.update.for.SPCrossDomainLib();
    ShareCoffee.CrossDomain.build.delete.for.SPCrossDomainLib();
    ShareCoffee.CrossDomain.build.del.for.SPCrossDomainLib();

T> ## IE 8 workaround
T> IE8 is supported by SharePoint 2013 OnPremise, if you're targeting this browser, you've to replace the **for** property by the **f** shorthand.
T> IE9 is not able to execute a function or access a proprety called **for**

T> ## del and delete
T> If you haven't read the REST chapter you may wonder why there is del and delete. Well that's because of some IE8 issues. Modern browsers such as Chrome, FireFox and Safari don't care if an object or method is called delete.
T> But IE8 is so strict when it comes to reserved keywords in JavaScript that IE8 will complain at runtime.
T> Internally will del execute the same logic as delete has execute since the first ShareCoffee release.

### Providing REST Properties

Passing properties for CrossDomain REST requests is exactly the same as for plain REST requests. So you don't have to learn anything new. Remeber, either you can pass a plain JSON object or you can use an instance of `ShareCoffee.REST.RequestProperties`.

### HostWeb Access for CrossDomain REST queries

When browsing MSDN for CrossDomain REST requests which should target the HostWeb, you may stumble upon urls that look like the following

`{SPAppWebUrl}/_api/SP.AppContextSite(@target)/web/lists/`

`GetByTitle('Tasks')/items?@target={SPHostUrl}`

which would be way to complicated to construct manually or remember over a timespan for more than a few hours. ShareCoffee is abstracting this for all REST queries where it's required. Once again, also when running CrossDomain, the worst and most verbose configuration would look similar to this

    ShareCoffee.CrossDomain.build.create.for.SPCrossDomainLib({
        url: "web/lists/GetByTitle('Tasks')/items",
        payload: listItemInfo,
        hostWebUrl: ShareCoffee.Commons.getHostWebUrl()
        onSuccess: function(data){},
        onError: function(data){}
    });

Compared to frameworks as jQuery, AngularJS or reqwest, SP.RequestExecutor isn't offering a chained API for handling request callbacks. Therefor it's required to provide those callbacks using the options object.

### Execute CrossDomain queries with SP.RequestExecutor

The only missing piece right here is how to use `SP.RequestExecutor`. It's offering a simple handy API which makes executing REST calls in CrossDomain scenarios easy.

    var e = new SP.RequestExecutor(ShareCoffee.Commons.getAppWebUrl());
    var onListsLoaded = function(data){
      // process lists
    };
    var options = {
      url: 'web/lists/?$select=Id,Title',
      onSuccess: onListsLoaded,
      onError: function(data, code, errorMessage){
        console.log("Error " + code + ": " + errorMessage);
      }
    };

    e.executeAsync(ShareCoffee.CrossDomain.build.
       read.for.SPCrossDomainLib(options));


## CrossDomain CSOM

### Manually activating CrossDomain Support for CSOM

In order to get CSOM working in a CrossDomain scenario, you've to load three different scripts by adding those references to all your websites manually

  * `{SPHostUrl}/_layouts/15/SP.Runtime.js`
  * `{SPHostUrl}/_layouts/15/SP.js`
  * `{SPHostUrl}/_layouts/15/SP.RequestExecutor.js`


### Activating CrossDomain Support for CSOM with ShareCoffee

As for CrossDomain REST libraries, there is also a single method which can be invoked in order to load all the required CrossDomain libraries for CSOM. `ShareCoffee.CrossDomain.loadCSOMCrossDomainLibraries()` can also carry a callback for success and failure as parameter.

    var onLibrariesLoaded = function(){
        goAndReadSomeDataUsingCSOM();
        goAndWriteSomeDataUsingCSOM();
    };

    var onFailure = function(){
        console.log("Error while loading CSOM CrossDomain libraries");
    };

    ShareCoffee.CrossDomain.
       loadCSOMCrossDomainLibraries(onLibrariesLoaded, onFailure);

You can also use the `ShareCoffee.CrossDomain.crossDomainLibrariesLoaded` property in order to detect if the CrossDomain libs have already been loaded by ShareCoffee.


## Requesting the CSOM ClientContext

Receiving the ClientContext means for a CrossDomain scenario that you've to issue a new instance of `SP.ProxyWebRequestExecutorFactory` which is also handled by ShareCoffee for you the `ShareCoffee.CrossDomain.getClientContext` method checks if CSOM libraries are loaded for CrossDomain. If so, it'll instanciate a valid ClientContext instance for you which allows you to focus on your work directly.


    var getUserName = function(){
        var ctx = ShareCoffee.CrossDomain.getClientContext();
        var user = ctx.get_web().get_currentUser();
        ctx.load(user);
        ctx.executeQueryAsync(function()
        {
            $("#user-name").val(user.get_title());
        },
        function(sender,args){
            console.log(args.get_message());
        });

    };

    ShareCoffee.CrossDomain.loadCSOMCrossDomainLibraries(getUserName,
       onFailure);


The ClientContext you're receiving by `getClientContext` is always targeting the AppWeb, if you're interested in accessing data form the HostWeb, you've to use `getHostWeb` as described in the upcoming section.


## Accessing the HostWeb using CSOM in CrossDomain

T> ## Don't forget the permissions
T> When accessing resources from the HostWeb, you've to explicitly request permissions for those resources. If you're not aware of permissions for SharePoint Apps, review Chapter 1, there is a dedicated section on SharePoint App Permissions.

If you're interested in HostWeb data, as for example all the tasks from a task-list, you've to use the combination of all the methods shown before and `getHostWeb` which will look like this

    var onTasksReceived = function(tasks){
        var enumerator = tasks.getEnumerator();
        while(enumerator.moveNext()){
            var currentTask = enumerator.get_current();
            // print task to website
        }
    };

    var getTasks = function(){
        var ctx = ShareCoffee.CrossDomain.getClientContext();
        var hostWeb = ShareCoffee.CrossDomain.getHostWeb(ctx);
        var items = hostWeb.get_lists().
           getByTitle("Tasks").
           getItems(CamlQuery.createAllItemsQuery());
        ctx.load(items);
        ctx.executeQueryAsync(onTasksReceived, function(sender,args){
            console.log("Error while loading tasks from the HostWeb " +
               args.get_message());
        });
    };

    ShareCoffee.CrossDomain.loadCSOMCrossDomainLibraries(getTasks,
        onFailure);

The `getHostWeb` method is offering two parameters, first there is the `ClientContext` which is required. The second parameter is the HostWebUrl you're interested in. By default it's using your Apps HostWebUrl, but imagine you'd like to query all the blog entries from a subweb, located within the original HostWeb, your call will look like this

    var blogUrl = ShareCoffee.Commons.getHostWebUrl() + "/myblog/";
    ShareCoffee.CrossDomain.getHostWeb(ctx, blogUrl);
