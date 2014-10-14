# ShareCoffee.UserProfiles

ShareCoffee.UserProfiles is the second AddOn provided by the author. In contrast to search queries are UserProfile queries not that complicated, but remembering the REST endpoint urls may be the hardest task when dealing with user profiles using SharePoint's REST API.

As true for all AddOns, you've to explicitly install it either by using **NuGet** or **bower.io**.

    Install-Package ShareCoffee.UserProfiles
    # or if you're using bower
    bower install ShareCoffee.UserProfiles

Next you've to load all the required script files within your website

{title="Adding script references",lang=html}
~~~~~~
    <!-- for the minified version -->
    <script type='text/javascript'
            src="../Scripts/ShareCoffee/ShareCoffee.min.js"></script>
    <script type='text/javascript'
            src="../Scripts/ShareCoffee.UserProfiles/ShareCoffee.UserProfiles.min.js"></script>

    <!-- or for the debug version -->
    <script type='text/javascript'
            src="../Scripts/ShareCoffee/ShareCoffee.js"></script>
    <script type='text/javascript'
            src="../Scripts/ShareCoffee.UserProfiles/ShareCoffee.UserProfiles.js"></script>
~~~~~~

Once the package is installed and scripts are referenced, you can start exploring it's API. All AddOns are populating REST endpoint urls at `ShareCoffee.Url`, for search the available properties are


|Property|Url that will be returned|
|--------|-------------------------|
|ShareCoffee.Url.SetMyProfilePicture|SP.UserProfiles.PeopleManager/SetMyProfilePicture|
|ShareCoffee.Url.GetMyProperties|SP.UserProfiles.PeopleManager/GetMyProperties|
|ShareCoffee.Url.GetProperties|SP.UserProfiles.PeopleManager/ GetPropertiesFor(accountName=@v)?@v= |
|ShareCoffee.Url.GetUserProfileProperty|SP.UserProfiles.PeopleManager/ GetUserProfilePropertyFor(accountName=@v, propertyName=@p)?@v=&@p= |


## Receiving current users Properties

Reading the properties from the current user is pretty easy, just provide the url to ShareCoffee's fluent API and your already done

{title="load current users properties",lang=javascript}
~~~~~~
    $.ajax(ShareCoffee.REST.build.read.for.jQuery({
      url: ShareCoffee.Url.GetMyProperties
    })
    .done(onSuccess).fail(onError);
~~~~~~

## Reading User Properties

This sample demonstrates how to read all Properties for a given user (you've to pass the loginName for all these samples).

{title="read properties by user",lang=javascript}
~~~~~~
    var loadUserProperties = function(accountName){
        var p = new ShareCoffee.UserProfileProperties(
            ShareCoffee.Url.GetProperties,
            accountName
        );
        $.ajax(ShareCoffee.REST.build.read.for.jQuery(p))
        .done(onSuccess)
        .fail(onError);
    };

    loadUserProperties(myOffice365LoginName);
~~~~~~

## Reading an UserProfile Property

Depending on your environment, you can find useful information about users by querying UPS (UserProfileStore) as shown below

{title="read a property by user",lang=javascript}
~~~~~~
    var loadUserProfilePropertyFor =
        function(accountName, propertyName){
        var p = new ShareCoffee.UserProfileProperties(
            ShareCoffee.Url.GetUserProfileProperty,
            accountName,
            propertyName
        );
        $.ajax(ShareCoffee.REST.build.read.for.jQuery(p))
        .done(onSuccess)
        .fail(onError);
    };

    loadUserProfilePropertyFor(myOffice365LoginName, "WorkEmail");
~~~~~~

## Updating ProfilePicture

Updating the current users profile picture is pretty easy. You just have to construct a post request and configure it using the existing `ShareCoffee.ProfilePictureProperties` class as demonstrated below

{title="update the user profile pic",lang=javascript}
~~~~~~
     var newUserPictureStream = getPictureStreamFromSomewhere();

     var p = new ShareCoffee.ProfilePictureProperties(
         newUserPictureStream,
         onPictureUpdated,
         onError
     );
     $.ajax(ShareCoffee.REST.build.update.for.jQuery(p));
     .done(p.onPictureUpdated)
     .fail(p.onError);
~~~~~~
