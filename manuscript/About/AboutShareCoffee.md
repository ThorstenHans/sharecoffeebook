# ShareCoffee

Before actually digging into the framework itself, we should talk about some background and common information about ShareCoffee.

![ShareCoffee](images/ShareCoffee_small.png)
## License

ShareCoffee is licensed under MIT which means you can use ShareCoffee for your personal projects. For professional developers or companies this is also perfect, because they can easily use ShareCoffee to get customer projects done or build new products powered by ShareCoffee, without having the fear to violate any license terms.

## Background

Back in 2012 I was able to get my fingers on SharePoint 2013 beta and its new APIs. The new App Model which is part of the platform allows almost every developer to build Apps that integrate with SharePoint 2013 or SharePoint Online (which is part of Office 365).
From this point in time, I moved my focus away from server-side SharePoint development in direction App Development. Finally I was able to use common web technologies, latest frameworks and all the most recent programming languages to build extensions for SharePoint. So I created one App after another and
during my SharePoint App journey I stumbled upon different aspects from the App Model that drove me crazy.

For example let's review data access technologies in SharePoint Apps. Depending on where your code is running (SharePoint Hosted or Provider Hosted) you've to use different configurations for your REST queries in order to get them working. In addition to that it's also important to know early in development lifecycle
where the data will be persisted (AppWeb or HostWeb) because this will also bring impacts to the way you're configuring your REST requests.

Let's consider the following scenario: As a developer you're responsible for building a Task-Management-App based on SharePoint's new App Model. In the beginning you're designing your App to store all its data within the AppWeb. After a few iterations, the product-owner reaches out and asks to provide built-in SharePoint features
to all the users of the App. After reviewing this request you may realize that the lists on the AppWeb are a little *limited* compared to the lists on the HostWeb. So you make the decision to move the TaskList from the AppWeb to the HostWeb. When doing so, you've to alter all the existing REST requests which are responsible for
reading, creating, updating and deleting tasks within your App.

This is only a single scenario, but it's already pointing out some of the pain points you'll notice when building SharePoint Apps.

ShareCoffee was built to solve exactly these kinds of issues. In bottom line, I built ShareCoffee to:

 * have a unified API for all requests
 * reduce the amount of code developers have to write
 * provide a fluent API which is easy to remember
 * integrate in most popular frameworks
 * get rid of unnecessary dependencies

## Features

In general ShareCoffee is providing features for five main parts of SharePoint App Development.

 * REST
 * CrossDomain
 * CSOM (Client Side Object Model)
 * UI
 * Commons

Most efforts have been invested in providing a great API for dealing with REST requests in SharePoint Apps. CrossDomain offers almost the same functionality but is dedicated to Provider-Hosted App scenarios. Third powerful part of ShareCoffee is UI functionality, the namespace provides for example a single method to load the entire AppChromeBar into your SharePoint App, which is mandatory in order to submit your SharePoint App to the SharePoint Store. There are also a few other UI helper methods included inside of the UI namespace which will be covered in the upcoming chapters.

![ShareCoffee Architecture](images/about_sharecoffee/architecture.png)

For CSOM, ShareCoffee is only providing a few helper methods which are abstracting common functionalities, in order to write CSOM logic even faster and have an API which is good to remember.

Last but not least is ShareCoffee.Commons, Commons has been used to write all the other functionalities, it's really the *Core* of ShareCoffee, but also exposing great methods which will save a lot of time and headache during the phase of developing your Apps. For more information on ShareCoffee.Commons, see the dedicated section in chapter 3.

## Browser compatibility

The framework and its AddOns were mainly designed and developed to support all the browsers where Microsoft's Office 365 is supported. When hitting release v0.1.0 (most recent release when writing this eBook), ShareCoffee became IE8 support. This turned out to be important because SharePoint Server 2013 is still supporting IE8, for Office 365 by contrast requires IE9.

## Development Stack

Many people out there were asking why ShareCoffee is named **ShareCoffee**. It's just describing what the framework actually is. ShareCoffee is a framework for **SharePoint** which has been written in **CoffeeScript**.

The development stack is totally platform independent. No matter if you're using a Windows Power Machine to write your code, a Surface, a ChromeBook or a MacBookPro, you can easily fork ShareCoffee and contribute to the framework itself.

There is only a single dependency that you need on your ShareCoffee development system installed - [Node.JS](http://nodejs.org). Everything else will be installed automatically using NodeJS' package manager [npm](http://npmjs.org)

![NodeJS](images/nodejs.png)

ShareCoffee has been written using TDD (Test Driven Development) which means that for each and every line of productive code, there is at least a single UnitTest which is responsible for describing and validating the expected result from that bit of code.

If you're interested in contributing to ShareCoffee itself, feel free to fork the repository on github. But later Pull-Requests without respecting the TDD mantra won't be moved to the live repository.

It's also a good idea to dig into [CoffeeScript](http://coffeescript.org).

![CoffeeScript](images/coffeescript.png)

There is some automation build into ShareCoffee, as for any JavaScript framework in this decade, I've used a JavaScript task-runner. In my case I've chosen [GruntJS](http://gruntjs.com) for automating all the stuff I need.

![GruntJS](images/gruntjs.png)

Some of the automation steps that are used in ShareCoffee are

  * Concatenating CoffeeScript Files
  * Executing all the Unit Tests
  * Embedding MIT license on the fly
  * Translation from CoffeeScript to JavaScript
  * Minifying the JavaScript files
  * Building the NuGet Package

W> ## NuGet Package Generation
W> Nuget Packaging works on all plattforms when using ShareCoffee Version 0.1.2 or later.
W> If you're using an older ShareCoffee Version, you should either update the package or you can use a Windows machine in order to build the NuGet Package manually.


## Bugs / Feature Requests

As mentioned earlier, ShareCoffee is hosted on github. When it comes to collaboration based on development projects, github is awesome.

![github](images/github.png)

That's the reason why I've decided to use github not only for hosting the code. Also all the feature requests, bugs, questions from other developers where housed within ShareCoffee's repository. If you have any kind of question / bug / feature request for ShareCoffee
[visit the repositories issue list](https://github.com/ShareCoffee/ShareCoffee/issues) and use github issues to collaborate with me or with other ShareCoffee users out there.

![Use gitub's issue list for bugs or feature requests](images/about_sharecoffee/github_issues.png)
