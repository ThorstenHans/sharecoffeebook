#ShareCoffee.Commons

ShareCoffee's Commons namespace is exposing a lot of great functionality which can be used within the scope of any SharePoint App to gather required information about the App itself and it's current context.

The commons have been used throughout the entire library in order to build up all the features like REST, CrossDomain or CSOM abstraction.

##Commons.getAppWebUrl()

As the name implies, you can ask for the current AppWeb url by simply executing

`ShareCoffee.Commons.getAppWebUrl()`.

Internally this method is taking care of all the context. first it's checking if your App is running as SharePoint Hosted, if so it's returning the AppWeb url from the global `_spPageContextInfo` object instead of pulling it from the QueryString because it can save some cycles by doing so. (Reading the AppWeb url from the QueryStirng is common in Provider Hosted Apps)

    var myAppWebUrl = ShareCoffee.Commons.getAppWebUrl();

But there are scenarios when you as a developer are going to store the AppWeb url in your own storage and you'd like to read it from there. Therefor is ShareCoffee exposing an injection point where you can either provide directly a string or a method which will be invoked. Once you set one of both, it's only executing your logic and ignoring all the other stuff.

<<[AppWebUrl Usage](../code/commons/appweburl.js)

##Commons.getHostWebUrl()

`getHostWebUrl()` can be used in exactly the same way as `getAppWebUrl()`. By default this method is extracting the HostWeb url from the current QueryString.

    var hostWebUrl = ShareCoffee.Commons.getHostWebUrl();

As the same for `getAppWebUrl()` you can inject either a string or a custom function for querying the HostWeb url by assigning it to `loadHostWebUrlFrom` as shown below

<<[HostWebUrl Usage](../code/commons/hostweburl.js)

##Commons.getApiRootUrl()

`getApiRootUrl()` is mostly used internally to construct REST urls. It's returning the combination of `getAppWebUrl()` and `/_api/`.

    var apiRootUrl = ShareCoffee.Commons.getApiRootUrl();
    console.log(apiRootUrl);
    // will print https://sample.sharepoint.com/appweb/_api/

##Commons.getFormDigest()

`getFormDigest()` is one of the important helper methods when working with REST operations. Because SharePoint is doing request validations for all requests that create, update or delete data from SharePoint, a Form Digest value has to be passed to each of the REST requests.

    var formDigestValue = ShareCoffee.Commons.getFormDigest();
    console.log(formDigestValue);
    // will print something like SDF234-sdFDS2334wfescsfe...

SharePoint is handling this automatically if you're running SharePoint Hosted and when you're using the SharePoint MasterPage!

In all other scenarios like
 - Posting data from an AppPart
 - Posting data form a plain website which doesn't use the MasterPage

you've to manually request a FormDigest value and pass it aside your REST request.

`getFormDigest()` is returning the current FormDigest value if you're executing it on a Page using the SharePoint MasterPage.

It's also watching an injection point 'ShareCoffee.Commons.formDigestValue' where you can hook your custom logic to request a new FormDigest value from SharePoint's REST endpoint. [Read this article on my blog which describes how to request a FormDigest value on the fly](http://dotnet-rocks.com/2014/01/28/query-formdigestvalue-from-sharepoint-using-sharecoffee/).


##Commons.getQueryString()

If you're interested in the entire QueryString (which is appended to the current url), use

`ShareCoffee.Commons.getQueryString()`.

    var queryString = ShareCoffee.Commons.getQueryString();
    console.log(queryString);
    // will print something like SPHostUrl=foo....

##Commons.getQueryStringParameter()

Extract a single parameter value from the entire QueryString by calling

`ShareCoffee.Commons.getQueryStringParameter(name)` and pass the name of the parameter as string.

T> It's important to point out, that the return value is not decoded
T> in order to decode it pipe the return value to JavaScript's
T> decodeURIComponent() method


## Use $s to save even more keystrokes

Instead of writing each and every time `ShareCoffee.` you can also use the `$s.` shorthand to access all the ShareCoffee functions and properties.

    var queryString = $s.Commons.getQueryString();
    console.log(queryString);