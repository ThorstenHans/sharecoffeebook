# AngularJS for SharePoint Apps

[AngularJS](http://www.angularjs.org) is a MVC framework for frontend development. There are plenty of great tutorials, books and screencasts out there providing good introductions. For SharePoint App Developers, AngularJS is valuable because it allows you to build robust, testable and maintainable Apps also on the client-side.

This book will not provide a complete introduction for AngularJS. It'll just describe the main counterparts of an AngularJS App before actually heading over to more exercises.

Another great benefit is dependency injection (DI). Angular has a built in DI-Container which is responsible for injecting all the dependencies you're using like `$http` for HTTP or HTTP communication API.


## AngularJS building blocks

An AngluarJS App is made of three different kinds of components. First there are views, views are created using standard HTML5 language elements. Beside views, AngularJS is using controllers in order to expose both, data and functionality to the view. Last but not least there are models. Models are representing data that will be user throughout the application.

### Views

To keep it short, AngularJS is making extensive use of directives that are either prefixed by an **ng-** or - to be HTML5 conform - an **data-ng-** it's up to you which kind of prefix do you use to write these directives. Beside directives, there are expressions. Expressions are wrapped by double-angle-brackets `{{expression}}`. Angular itself is taking care about how to bind values from the controller to the view and back from the controller to the view.

    <div data-ng-app="myFirstApp">
      <div data-ng-controller="sampleCtrl">
         <input type='text' data-ng-model="name"/>
         <br/>
         <label> Hello {{name}}</label>
         <br/>
         <button data-ng-click="writeMessageToConsole()">
             Grret to Console
         </button>
      </div>
    </div>

As you can see, there are different `data-ng-` directives used in the sample above. First there is the `data-ng-app` directive which tells AngularJS that an App will be placed at this point. Right after describing the App itself, there is an `data-ng-controller` directive which tells Angular which controller should be used to render the upcoming area.

### The App

AngularJS Apps have to be created by using plain JavaScript. AngularJS framework is exposing a method called `module`, which will be used to create or reference an AngularJS App.

    angular.module('myFirstApp',[]);

The second parameter is used to specify dependencies for your AngularJS module or in this case, for out App.

### Controllers

A single view can have multiple controller, each controller is representing an instance of a custom JavaScript object which is exposing an object called `$scope`. $scope is perhaps the most important object when talking about controllers. It's used to expose both, data and functionality to the view. Controller are defined inside of our app, therefor the code for creating the controller will look like the following

    angular.module('myFirstApp').controller('sampleCtrl',
      function($scope){
        $scope.name = 'World';

        $scope.writeMessageToConsole = function(){
          console.log($scope.name);
        };
    });

### Models

In the sample above, there is no need for a module at all. But for Apps based on SharePoint, SharePoint itself is creating our models by returning data from it's REST services. You can either use the results from SharePoint as returned or - if you like so - you can transform SharePoint's results to your own JavaScript model classes using plain JavaScript language features.

### Conclusion

In order to get this sample up and runing, you've to add an reference to AngularJS by placing the following script reference in the head of your HTML file

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>

You can also use [jsfiddle](http://jsfiddle.net) for getting started with AngularJS or [review the sample here](http://jsfiddle.net/709efwnm/1/).


### Services

AngularJS is component based, in order to capsulate the entire communication from the controller, AngularJS is using services. Services are defined similar to controllers, by invoking the `service` method on an AngularJS module.

    angular.module('myFirstApp').service('name', function(){
      // service logic...
    });


## AngularJS and ShareCoffee

The upcoming exercise will give you an complete guide how to create a SharePoint App using the combination of these two open-source libraries. As you've seen in the REST chapter, ShareCoffee is integrating well into AngularJS. You can create REST requests that are preconfigured for using it with AngularJS' `$http` API. Because of this integration it's easy to hook and use ShareCoffee in any of your AngularJS services.

I> ##ng-sharepoint
I> [Kevin Mees][https://github.com/kmees] has created a dedicated wrapper for accessing SharePoint's REST APIs based on ShareCoffee.
I> [angular-sharepoint](https://github.com/ExpertsInside/angular-sharepoint) will reduce the amount of code you've to write again dramatically. If you're interested in working with ShareCoffee and AngularJS you should also check his library.


#Let's build a TaskManagement App (AppWeb)

This sample will demonstrate how to use ShareCoffee in order to build a simple TaskManagement App for SharePoint (Online) which uses a Task-List from the AppWeb as datastorage.

Again open Visual Studio and create a new SharePoint AppProject

|Setting|Value|
|-------|-----|
|Project Name|AppWebTaskManager|
|Developer Site Url|Path to your developer site|
|Hosting Type|SharePoint Hosted App|

Once the App has been created, again install the dependencies using NuGet Package Manager

  * ShareCoffee
  * FontAwesome
  * AngularJS.Core

## Creating the Task List

Right-Click the App Projekt from the SolutionExplorer and select **Add Item** from the ContextMenu. From the dialog choose **List** and provide **Tasks** as the name. And use the following list settings:

![List Settings](images/exercises/TasksAppAppWeb/list_settings.png)

## Coding the App

Again the App will again be built from three core components

  * The App UI (default.aspx)
  * The App Script (app.js)
  * The App Styles (app.css)


### The App UI

In order to get everything working you've again to add references to all the stylesheets and script files

<<[Default.aspx code](code/exercises/taskappappweb/default_refs.html)

The UI is again straight forward. Use this HTML inside of the **PlaceHolderMain** Content Control

<<[Default.aspx code](code/exercises/taskappappweb/default.html)

### The App Script

Open the App.js file from the scripts folder and replace it's content with the following source.

<<[App.js code](code/exercises/taskappappweb/app.js)

### The App Styles

Again, to fix some style bugs insert the following stylesheets in App.css (which is located in your Apps content directory).

<<[App.css stylesheets](code/exercises/taskappappweb/app.css)

### Executing the App

When executing the App, it should render your TaskManagement App like the following:

![AppWeb TaskManagement App](images/exercises/TasksAppAppWeb/final_app.png)

### Download the Source

The entire source-code for this example can be downloaded [here](http://1drv.ms/1BU25AA)


#Let's build a TaskManagement App (HostWeb)

This sample will provide a similar experience as the TaskManagement App based on the AppWeb. Instead of relying on the AppWeb, this sample will be based on the HostWeb in order to make use of all the standard Task-List features which SharePoint as a platform provides.

Again open Visual Studio and create a new SharePoint AppProject

|Setting|Value|
|-------|-----|
|Project Name|AppWebTaskManager|
|Developer Site Url|Path to your developer site|
|Hosting Type|SharePoint Hosted App|

Once the App has been created, again install the dependencies using NuGet Package Manager

  * ShareCoffee
  * AngularJS.Core
  * FontAwesome

## App Permission

In order to access the data from the HostWeb, your App must request manage permissions for the **List** scope. **Write** is required, because our App will perform READ and WRITE operations to a Task List.

In order to minimize the coding efforts for this exercise, this App will make use of an existing Task list called **Tasks** if there is a Task-List called Tasks on your HostWeb, you're fine, if not, go and create one right now. The list can of course be created using either JavaScript Object Model (JSOM) or SharePoint's REST interface, but that would blow-up the sample too much.

![App Permissions](images/exercises/TasksAppHostWeb/app_permissions.png)

## Coding the App

Again the App will again be built from three core components

  * The App UI (default.aspx)
  * The App Script (app.js)
  * The App Styles (app.css)


### The App UI

In order to get everything working you've again to add references to all the stylesheets and script files

<<[Default.aspx code](code/exercises/taskapphostweb/default_refs.html)

The UI is again straight forward. Use this HTML inside of the **PlaceHolderMain** Content Control

<<[Default.aspx code](code/exercises/taskapphostweb/default.html)

### The App Script

Open the App.js file from the scripts folder and replace it's content with the following source.

<<[App.js code](code/exercises/taskapphostweb/app.js)

### The App Styles

Again, to fix some style bugs insert the following stylesheets in App.css (which is located in your Apps content directory).

<<[App.css stylesheets](code/exercises/taskapphostweb/app.css)

### Executing the App

When executing the App, it will ask you if you trust the TaskManagement App. In this dialog, it's important **to choose the Task-List (Tasks) from the shown dropdown**.

![HostWeb TaskManagement App Trust](images/exercises/TasksAppHostWeb/app_trust_dialog.png)

If you've trusted the App, you'll be forwarded to your Task-Management App which will look like this:

![HostWeb TaskManagement App](images/exercises/TasksAppHostWeb/final_app.png)

## Download the Source

The entire source-code for this example can be downloaded [here](http://1drv.ms/1BU29QG)
