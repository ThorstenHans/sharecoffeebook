# ShareCoffee.Search

SharePoint Search may be a beast. It's API is very powerful and allows you to build queries that match 100% to your (or your customer's) demand. Also Search's REST API is offering a ton of parameters which could be specified. Remembering all these parameters with it's casing is a kind of impossible. And because also the casing is very important, ShareCoffee.Search is assisting in exactly this area.

It's not only providing a Search Configuration Object (which cares internally about casing properties in the way SharePoint required them), not it's also providing a simple object which provides all the Search endpoint urls for you.

As true for all AddOns, you've to explicitly install it either by using **NuGet** or **bower.io**.

    Install-Package ShareCoffee.Search
    # or if you're using bower
    bower install ShareCoffee.Search

Next you've to load all the required script files within your website

{title="Adding Script references",lang=html}
~~~~~~
    <!-- for the minified version -->
    <script type='text/javascript'
            src="../Scripts/ShareCoffee/ShareCoffee.min.js"></script>
    <script type='text/javascript'
            src="../Scripts/ShareCoffee.Search/ShareCoffee.Search.min.js"></script>

    <!-- or for the debug version -->
    <script type='text/javascript'
            src="../Scripts/ShareCoffee/ShareCoffee.js"></script>
    <script type='text/javascript'
            src="../Scripts/ShareCoffee.Search/ShareCoffee.Search.js"></script>
~~~~~~

Once the package is installed and scripts are referenced, you can start exploring it's API. All AddOns are populating REST endpoint urls at `ShareCoffee.Url`, for search the available properties are

|Property|Url that will be returned|
|--------|-------------------------|
|ShareCoffee.Url.Query|`search/query`|
|ShareCoffee.Url.PostQuery|`search/postquery`|
|ShareCoffee.Url.Suggest|`search/suggest`|

## Executing Search Queries

Creating a Query using ShareCoffee.Search is nothing special. Depending on your environment you either enter by ShareCoffee.REST or ShareCoffee.CrossDomain namespace and use the typical ShareCoffee API. If you’re executing queries using HTTP GET there is a URL length limitation which is defined in [RFC 2616](http://www.faqs.org/rfcs/rfc2616.html) caused by this ShareCoffee will throw an error if you try to execute a GET request using such a long URL. Instead you should use PostQuery (see next paragraph)

{title="Execute a Query using ShareCoffee.Search",lang=javascript}
~~~~~~
    // pass querytext, selectproperties, querytemplate to the ctor
    var properties = new ShareCoffee.QueryProperties();

    // or set them directly on the properties object
    properties.queryText = "Office 365";
    properties.rowLimit = 100;
    properties.startRow = 50;

    // either set on properties Object or use jQuery's API chain
    properties.onSuccess = function(data){
       // handle search results
    };

    $.ajax(ShareCoffee.REST.Search.build.read.for.jQuery(properties))
    .done(properties.onSuccess)
    .fail(function(error){
      // handle error
    });
~~~~~~
As you can see in the sample, `ShareCoffee.REST` will be used as you've already learned in the previous chapters, there is nothing new. The only important aspect here is to use an instance of **ShareCoffee.QueryProperties**.

## Executing Post Queries (with CrossDomain)

Executing a PostQurey means you must use an instance of **PostQueryProperties**. To make this sample a bit more interesting, you'll see how to execute a PostQuery in conjunction with SharePoint's CrossDomain library.

{title="Execute a PostQuery using ShareCoffee.Search",lang=javascript}
~~~~~~
    //load SharePoint's CrossDomain Library
    $s.CrossDomain.loadCrossDomainLibrary(onCrossDomainLibLoaded,
      function(){
        console.log("Error loading CrossDomain lib")  
    });

    var onCrossDomainLibLoaded = function(){
      var p = new ShareCoffee.PostQueryProperties();
      p.Querytext = 'Office 365';
      p.StartRow = 15;
      p.RowLimit = 200;
      p.onSuccess = function(suggestResults){
        // handle results;
      };
      p.onError = function(error){
        // handle error
      }

      var e = new SP.RequestExecutor(
        ShareCoffee.Commons.getAppWebUrl());
      e.executeAsync(ShareCoffee.CrossDomain.
          build.create.for.SPCrossDomainLib(p));
    };
~~~~~~


## Executing a Suggest Query

Last search operation that can be executed using SharePoint's REST API is a suggest query. Suggest Queries are also handled as simple GET requests by SharePoint.

{title="Execute a SuggestQuery using ShareCoffee.Search",lang=javascript}
~~~~~~
    var p = new ShareCoffee.SuggestProperties("SharePoint");
    p.showpeoplenamesuggestions = true;

    $.ajax(ShareCoffee.REST.build.read.for.jQuery(p))
    .done(function(data){
      // handle data  
    })
    .fail(function(error){
      // handle error
    });
~~~~~~
