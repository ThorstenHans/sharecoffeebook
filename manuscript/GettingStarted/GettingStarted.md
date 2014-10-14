# Getting Started

Enough dry background and information about ShareCoffee, let's get started using it. Within the upcoming sections you'll learn how to build a simple *Hello World SharePoint App*. Once the Hello World App is finished you'll get an introduction into the *ShareCoffee.Common* namespace, which is the actual core of ShareCoffee. Almost every additional feature is built on top of ShareCoffee.Commons. It's important to understand all the concepts and functionality which is built in the framework to be as productive as possible when building SharePoint Apps.

## Package Managers

Package Managers are great time savers for every developer. ShareCoffee is available for

 * [NuGet](http://www.nuget.org)
 * [Bower.IO](http://bower.io)

At the time ShareCoffee has been created, these were the most popular and well-known package managers out there. Every .NET developer should know NuGet, if you don't know it yet, you should read [Scott Hanselman's NuGet introduction](http://www.hanselman.com/blog/IntroducingNuGetPackageManagementForNETAnotherPieceOfTheWebStack.aspx) first.

Bower.IO introduces itself as package manager for the client-side. Which implies that bower is only managing client-side dependencies. Bower became popular with the rise of [Node.JS](http://nodejs.org) and [yeoman](http://yeoman.io).

### Installing ShareCoffee with NuGet

Installing ShareCoffee using NuGet is really simple. Just invoke the *Install-Package* command from the Package Manager Console, or use the Package Manager Dialogs provided by Visual Studio.

    Install-Package ShareCoffee

### Installing ShareCoffee with bower.io

First let's asume that *NodeJS* and *npm* (Node Package Manager) are installed on your development system. If that's true, you can install bower package manager by invoking

    # use g switch to install bower globally
    npm install bower -g

    # on unix based systems you've to prefix the command with sudo, which ensures that you've the required permissions
    sudo npm install bower -g

    # At this point you should have bower installed on your system.
    # Go into your project directory and execute the following command to install
    # ShareCoffee form the bower.io dictionary

    bower install sharecoffee

Bower offers exactly the same capabilities as NuGet like updating, downgrading, uninstalling dependencies. ShareCoffee is offering it's package also on bower.io in order to support SharePoint App developers that use NodeJS or RubyOnRails for building their Apps, because bower.io is more popular in their communities.
