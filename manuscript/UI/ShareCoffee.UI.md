#ShareCoffee.UI

When you're building Apps for SharePoint it's a best practice to re-use some of the UI characteristics that SharePoint as a platform is offering to you. Most of the features provided by ShareCoffee.UI are only interesting for Provider-Hosted Apps, because SharePoint-Hosted Apps get these capabilities by re-using SharePoint's MasterPage.
But ShareCoffee.UI is also exposing some small helpers regarding notifications and status messages which may also be interesting if it comes to SharePoint-Hosted App development.

## SharePoint App-Chrome-Bar

The App-Chrome-Bar is perhaps the most important component that you should include in your Provider-Hosted App. It's providing a common experience for Endusers. The App-Chrome-Bar is drawn on the top of your App and shows important links to all Office 365 services or On-Premise components from your SharePoint Farm.

In Addition to the Chrome-Bar itself, also the default stylesheet (CSS) from SharePoint will be included in your App. Once the stylesheet is loaded, you can easily reuse all the default SharePoint CSS classes. These CSS classes are theme-aware which means that your customer will have the same coloring (like accent colors) in your App as it's defined in SharePoint itself.

Microsoft is of course providing a Sample on MSDN how to integrate the App-Chrome-Bar in your SharePoint App, but the sample has the following disadvantages

 * adds a dependency to jQuery
 * is roughly about 50 lines of code
 * not offering IntelliSense for the code you've to write

ShareCoffee is offering a single method, which you've to call in order to get the App-Chrome-Bar.

    ShareCoffee.UI.loadAppChrome(target, options);

Yes, it's that easy. Behind the scenes all the required scripts and stylesheet files were dynamically download from the current SharePoint environment and on-the-fly loaded in the scope of the current document. In opposite to the current sample from MSDN, there is no need for jQuery right here. ShareCoffee is doing all the magic using plain old JavaScript in order to support all the available and supported browsers.

Providing a proper configuration (or options object) to the `loadAppChrome` method is also very easy and straight forward. The first parameter of `loadAppChrome` is the identfier from the target div, which has to be placed in your page

    <!-- Start.html -->
    <div id="sp-chrome"></div>

The entire configuration for the AppChrome is done by using ShareCoffee's model classes `SettingsLink` and `ChromeSettings`.

<<[AppChrome Sample](code/ui/app_chrome.js)


## SharePoint Notifications

Why should you care about an abstraction layer for SharePoint's notification system? Well, depending on your app and how you hook up your JavaScript code, SharePoint may still be delivering the JavaScript file while you're trying to create notifications, if you run in such an issue, an exception will be thrown and it'll prevent your script from executing as expected.

ShareCoffee, is double checking if all the required client-scripts are loaded, if any script is not loaded when you try to create a notification, it's simply logging the error to the console instead of throwing an error.

So the abstraction layer is making your code even more robust.

For notifications there are currently two methods available

  * `ShareCoffee.UI.showNotification()`
  * `ShareCoffee.UI.removeNotification()`

### UI.showNotification()

Using this method is straight forward. There is a single required parameter for this methods which is the notification text, as an optional second parameter you can provide a boolean flag which indicates if the notifcation should be sticky or not.

The method is returning an identifier, which can be used later to actually remove the notification again.

    var message = "Hello, ShareCoffee Notification";
    var notificationId = ShareCoffee.UI.showNotification(message);
    var notificationId2 = ShareCoffee.UI.showNotification(message, true);

### UI.removeNotification()

Removing a notification makes only sense if we're talking about sticky notifications, because default (non-sticky) notifications will disappear after a few seconds automatically.

Assume the code from the sample above, you've stored the identifier of the second notification in a variable called `notificationId2`, let's now remove that notification by calling `ShareCoffee.UI.removeNotification` and pass the identifier as parameter.

    ShareCoffee.UI.removeNotification(notificationId2);
    // Notification will disappear immediately

### Notifications Sample

![ShareCoffee Notifications Sample App](images/sharecoffee_ui/sharecoffee_notifications.png)

You can also download the entire sample code from above [here](http://1drv.ms/1BU2gvy).

## SharePoint Status messages

When it comes to SharePoint status messages all the advantages from Notifications will again be taken in place. But for Status messages there are four methods available

  * `ShareCoffee.UI.showStatus()`
  * `ShareCoffee.UI.setStatusColor()`
  * `ShareCoffee.UI.removeStatus()`
  * `ShareCoffee.UI.removeAllStatus()`

### UI.showStatus()

The `showStatus` method has up to four parameters, where first two parameters are required.

|Name|Required|DataType|Further Information|
|----|--------|--------|-------------------|
|Title|true|String||
|Message|true|String|can contain HTML|
|ShowOnTop|false|boolean|defines if status should appear on top (defaults to false)|
|Color|false|String|provide one of the following (red yellowblue) (defaults to blue)|

As the same for notification this method will also return the identifier of the generated status message

    var title = "ShareCoffee Status";
    var message "This is just a simple status update";
    var sId = ShareCoffee.UI.showStatus(title, message, false, 'yellow');


### UI.setStatusColor()

Once you've created a status message and you've stored it's status-identifer in a variable you can change the color of that particular status by invoking

`ShareCoffee.UI.setStatusColor()`. There are two required parameters for this method

|Name|DataType|Further Information|
|----|--------|-------------------|
|StatusId|String|Identifer from the status you'd like to alter|
|Color|String|New color value again one of the following (blue red yellow)|

    ShareCoffee.UI.setStatusColor(sId, 'red');

 If you pass null or undefined as a value for statusId, ShareCoffee will not call SharePoint's internal scripts, because this would result in another exception, so again it's making your code even more robust.


### UI.removeStatus()

The `removeStatus()` method will receive a single parameter which is the statusId. Again no call will be forwarded to SharePoint if you pass null or undefined.

    ShareCoffee.UI.removeStatus(sId);

### UI.removeAllStatus()

There are scenarios when you'd like to clean all existing status messages from the current website. This can easily be achieved by using the `removeAllStatus` method.

    ShareCoffee.UI.removeAllStatus();

### Status Messages Sample

![ShareCoffee Status Messages Sample App](images/sharecoffee_ui/sharecoffee_statusmessages.png)

All the sources for using ShareCoffee's status API are also available for download [here](http://1drv.ms/1BU2xyK)
