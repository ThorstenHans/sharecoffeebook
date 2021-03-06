# SharePoint Apps Introduction

ShareCoffee is an open source library for SharePoint App developers, if you're already familiar with SharePoint App Development, you can of course skip this chapter. If you're new to SharePoint App development, you should invest a few minutes and read this chapter. It's providing a rough introduction into SharePoint's App Model which is part of both SharePoint platforms, Microsoft SharePoint 2013 and SharePoint Online as part of Microsoft's Office 365.

Apps became part of the SharePoint platform to solve some issues which have been part of previous SharePoint Versions caused by both existing (and still supported) development models:

  * Sandboxed Solutions
  * Full Trust Code Solutions (FTC)

Some of these issues are

  * Have dedicated permissions for extensions (Apps)
  * Rely on a combination of App- and User-Permissions
  * Use Web Standards for extending SharePoint
  * Provide a robust extension model for hosting scenarios (Office 365)
  * Remove custom code from SharePoint Servers
  * Provide scalable architectures for OnDemand, OnPremise and Hybrid scenarios


## App Isolation

Each App has its own isolated scope. Microsoft is using a common container which is well-known by almost every SharePoint Developer, a SharePoint website (SPWeb). When an user installs an App on a SharePoint site, SharePoint will automatically create a new Sub-Web which is called AppWeb. AppWebs are hidden from the user, they won't be displayed anywhere in SharePoint's UI. Most times I explain AppWebs as 'developers' playground'. It's the place where SharePoint App developers can create Lists, ContentTypes, Fields, Workflows, Pages and Scripts,...

Of course can you create lists on the SharePoint site where you've installed the App. This site is always called HostWeb. If you're interested in accessing, creating, changing or deleting data from the HostWeb, your App has to explicitly request permissions in order to do so. The same applies when accessing services which are exposed by SharePoint such as:

  * Search
  * User Profile Store

As long as your App will only work with SharePoint-Items (SP-Is) within the boundaries of your AppWeb, you don't have to care about permissions. For more information on App Permissions, see the corresponding section in this chapter.

![SharePoint App Isolation (Dedicated Webs for each App Instance)](images/introduction/app_isolation.png)


## App Shapes

SharePoint is offering three different shapes for Apps.

  * Immersive Full Page Apps
  * App Parts
  * Custom Actions

![SharePoint App Shapes](images/introduction/app_types.png)

These three shapes are directly visible to your users. Each App can offer various numbers of items from any shape. Let's review each of the shapes.


### Immersive Full Page Apps

Immersive Full Page Apps are the most common shape for Apps on SharePoint. It's an entire webpage which gives you the entire surface for delivering additional value to SharePoint.

### App Parts

App Parts are small components which can be plugged into SharePoint sites. App Parts are very similar to legacy WebParts, which all SharePoint users know from the early days in the SharePoint era. The big difference compared to a legacy WebPart is that AppParts are rendered as an IFrame. The IFrame's source attribute is targeting a webpage on the AppWeb.

### Custom Actions

Custom Actions are small UI components which can be hooked into different. predefined sections all over SharePoint's UI. Most popular example may be the Edit Control Block (ECB) which is the ContextMenu within ListViews. Another great example is Ribbon Commands. Microsoft's incredible interaction control can be extended in exactly the same way as the ECB.

Like back in the days of SharePoint 2007 or SharePoint 2010 you'll use either CAML or given Designers in Visual Studio in order to create Custom Actions.


## App Hosting Types

Microsoft is currently offering two different kinds of Hosting for SharePoint Apps.

![SharePoint App Hosting Options](images/introduction/app_hosting_types.png)

## SharePoint Hosted Apps

SharePoint Hosted Apps are the easiest option when building SharePoint Apps. SharePoint (the platform itself) is responsible for hosting and isolating your App. This great functionality comes definitely with some limitations. In SharePoint Hosted Apps, you're limited to client-side technologies. In bottom line you can use

 * HTML5
 * CSS3
 * JavaScript

JavaScript can be replaced in the list above by languages compiling into JavaScript such as [TypeScript](http://www.typescriptlang.org/) or [CoffeeScript](http://coffeescript.org/). Both of these languages are offering great advantages compared to plain old JavaScript and I definitely suggest you to review both languages and use one of them instead of writing plain old JavaScript manually.

Both languages are compiled into the *Good Parts of JavaScript* and again, these languages will make you even more productive and you can save more and more time.


## Provider Hosted Apps

For serious Apps you'll definitely consider building a Provider-Hosted-App instead of a SharePoint-Hosted App. Provider-Hosted Apps are powered by native web applications, which are integrated into SharePoint. The most important aspect is, that your code will not run on a SharePoint box. As the name implies are you - as a Solution Provider - responsible for hosting your App. It's totally up to you if you're relying on servers sitting in your data center, web servers hosted by your customers or if you bet on Microsoft Azure.

Visual Studio allows you as a developer to create either an ASP.NET WebForms Application or an ASP.NET MVC Application when building Provider-Hosted Apps for SharePoint. But of course you can use any programming language to do so. If you're familiar with Node.JS or RubyOnRails, you can use any of them to build your App's backend.

I> ## Autohosted Apps
I> Visual Studio and SharePoint Tools are still displaying Autohosted Apps as third hosting option (When you're still using VS 2013 Update 2), but Authohosted Apps are already deprecated.


## OAuth 2.0

SharePoint 2013 and SharePoint Online are by default using [OAuth 2.0](http://oauth.net/2/) in order to deal with security and authorization. One of the most important aspects of OAuth2.0 is that all the pieces from your App (all the relying parties) have to communicate over HTTPS **without any exception**. As described in OAuth2.0 specs, apps can either request access in behalf of a user (in such a case SharePoint is dealing with both, a UserContext and an AppContext), or Apps can also request access to resources without being controlled by a user (SharePoint is only dealing with an AppContext).

In OAuth2.0 secured scenarios, applications have to request permissions for each and every resource they'd like to **access**. By **accessing** all CRUD operations are ment. (Create|Read|Update|Delete).

Instead of dealing with user credentials OAuth2.0 relies on Tokens which are exchanged by SharePoint and your app. This reduces the pain of storing passwords and user information inside of your App. Management is another great advantage from using OAuth2.0. SharePoint Administrators are able to revoke access for each and every App in no time.


## App Permissions

As an App Developer you should always try to request as few permissions as possible. Users have only the chance to either provide all the requested permissions during installation time or to reject all requested perissions. There are no further choices available.

App Permissions are describing what your App needs to access in order to fill end-user's requirements. When creating a new SharePoint App Project in Visual Studio, you can request permissions from within the **AppManifest.xml** file. Visual Studio 2013 is also providing a Visual Designer for the AppManifest, so you don't have to dig deep in the XML Schema for the AppManifest.

An App Permission is composed of up to three parts

|Part|Description|
|----|-----------|
|Scope|Defines the resource (SharePoint Item) your App is interested in|
|Permission|Determines which action you App will perform on the scope|
|Properties|Optional carrier for further configuration|


For example let's consider that you're building an App which should use SharePoint's Search engine to pull information from SharePoint. In order to get your App working you've to configure the following permission request using the AppManifest Designer

![Requesting Permissions using Visual Studio 2013](images/introduction/vs2013_premission_request.png)

See the following list of all available scopes and their permissions.

|Scope|Product|Permissions|
|-----|-------|-----------|
|Business Connectivity Services (BCS)|SharePoint|Read|
|Core|Project Server|Manage|
|Core|SharePoint Social|Read,Write,Manage,FullControl|
|Enterprise Resources|Project Server|Read,Write|
|List|SharePoint|Read,Write,Manage,FullControl|
|Multiple Projects|Project Server|Read,Write|
|News Feed|SharePoint Social|Read,Write,Manage,FullControl|
|Reporting|Project Server|Read|
|Search|SharePoint Social|QueryAsUserIgnoreAppPrincipal|
|Single Project|Project Server|Read,Write|
|Site Collection|SharePoint|Read,Write,Manage,FullControl|
|Status Updates|Project Server|SubmitStatus|
|Taxonomy|SharePoint|Read,Write|
|Tenant|SharePoint|Read,Write,Manage,FullControl|
|User Profiles|SharePoint Social|Read,Write,Manage,FullControl|
|Web|SharePoint|Read,Write,Manage,FullControl|
|Workflow|Project Server|Elevate|

The Permission Masks are mapped to SharePoint actions

|Permission|Included SharePoint Permission|
|----------|------------------------------|
|Read|View Items|
||Open Items|
||View Versions|
||Create Alerts|
||Use Self-Service Site Creation|
||View Pages|
|Write|Read permissions plus|
||Add Items|
||Edit Items|
||Delete Items|
||Delete Versions|
||Browse Directories|
||Edit Personal User Information|
||Manage Personal Views|
||Add / Remove Personal Web Parts|
||Update Personal Web Parts|
|Manage|Write permissions plus|
||Manage Lists|
||Add and Customize Pages|
||Apply Themes and Borders|
||Apply Style Sheets|
|FullControl|All Permissions|

## App-Only Permissions

Perhaps you have noticed the **Allow the App to make App-Only calls to SharePoint** checkbox in the picture above. This setting is only working for Provider-Hosted Apps. Consider a WebApplication which is using TimerJobs to calculate things each and every day. Depending on this calculation your App has to update a SharePoint ListItem. In such a scenario no **real User** is actually using your App. In order to successfully    access resources in SharePoint your App has to execute an AppOnly call at this time.

It's just a simple checkbox, but it enables you to build even more powerful SharePoint Apps. If you'd like to learn more about App authorization policies in SharePoint 2013, you should read [this MSDN article](http://msdn.microsoft.com/library/fp179892(office.15).aspx)
