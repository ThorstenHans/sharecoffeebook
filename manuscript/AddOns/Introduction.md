# ShareCoffee AddOns

As true for every JavaScript library it's easy to extend such libraries. ShareCoffee is also offering two AddOns. Currently there are AddOns available for

 * SharePoint Search API
 * SharePoint UserProfiles API

all the requests or operations could also be invoked by using only the main *ShareCoffee* framework. Why should you care about these AddOns? Well, these AddOns are providing an higher level of abstraction for those services. Have you ever used the REST endpoints for UserProfile Services? The REST endpoint urls are hard to remember, because of that *ShareCoffee.UserProfiles* is providing a helper property which exposes all the urls as JavaScript properties.

Another great example for Search are PostQueries. Once you Search query becomes to complex, you've to use a PostQuery instead of sending search requests using the default GET endpoint. When invoking a PostQuery, you've to provide exaclty the same casing as Microsoft is using internally within the CLR classes. All incoming search requests will automatically be translated in CLR objects, unfortunately is the translation logic not smart enough to ingore case errors. *ShareCoffee.Search* provides a JavaScript class which ensures proper casing for all the PostQuery properties SharePoint 2013 is offering. You see, it's not only about time-saving, it's also about robustness!
