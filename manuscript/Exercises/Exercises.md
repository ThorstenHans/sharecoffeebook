#Exercises

You can download all the exercises from this chapter, see the corresponding links at the end of each exercise to get the entire source code for each sample.

#Let's build a SearchCenter App

The SearchCenter App will allow users to query for everything indexed by SharePoint's Search engine. During this exercise you'll build a SharePoint-Hosted App, which makes use of ShareCoffee and jQuery. Combined with some easy CSS styling in order to build this entire experience.

This sample contains common steps in more detail as the following exercises. If you're not familiar with SharePoint App development, this is the best starting point for you.

  * Open **Visual Studio 2013** by using the **Run as Administrator** context menu action
  * Create a new **SharePoint App** Project using `FILE|NEW|PROJECT`
  * Provide **SearchCenterApp** as name for your project
  * Provide the path to your **SharePoint Developer Site** and set App-Hosting-Type to **SharePoint-Hosted App**
  * Close thi Create-Project-Wizard by clicking **Finish**

## Install dependencies

In order to install all the required dependencies **Right-Click** your SharePoint App project and select **Manage NuGet Packages**. Use the Search-Box in order to find and install the following packages

  * ShareCoffee.Search
  * Bootstrap

Once these packages were installed, your project's structure will look like the following.

![SearchCenter App's project structure](images/exercises/searchapp_structure.png)


## App Permissions

Open **AppManifest.xml** and go to the **Permissions** tab. From the **scope** column select **Search** and for **Permission** select **QueryAsUserIgnoreAppPrincipal**.

This is ciritcal because without requesting this permission, SharePoint will bounce your search requests.


## The User Interface (UI)

The UserInterface (UI) for the SearchCenter App is pretty easy. Open **Default.aspx** from the **Pages** folder.
Look for the following comment located in the first half of the ASPX file.

    <!-- Add your CSS styles to the following file -->

Load Bootstrap right here by referencing the CSS file

    <link rel="stylesheet" href="../Content/bootstrap.min.css"/>

Next, look for another HTML comment:

    <!-- Add your JavaScript to the following file -->

Load ShareCoffee and it's Search AddOn right here by adding these lines of HTML code

    <script type="text/javascript" src="../Scripts/ShareCoffee/ShareCoffee.min.js"></script>
    <script type="text/javascript" src="../Scripts/ShareCoffee/ShareCoffee.min.js"></script>

I> CSS loading order
I> Ensure that your App.css is referenced after Bootstrap's CSS this is important for overriding bootstrap's styles as shown later in this section.


Remove the content from
`<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">` `</asp:Content>` node.

Add the following HTML at this point

<<[default.aspx code](code/exercises/searchcenter/default.html)


## The Script

From the script's folder open the **App.js** file, delete it's content. Create a new JavaScript constructor function for encapsulating SharePoint's Search Service and re-use it from the click-handler

<<[app.js code](code/exercises/searchcenter/app.js)



## The Styling

Bootstrap is already providing some great styling for our App, but we've to add some small tweaks in order to polish it when using SharePoint's MasterPage. Open the **App.css* file from the **Content** folder and delete it's content. Add the following lines of custom css for overriding bootstrap's css styles.

<<[app.css stylesheets](code/exercises/searchcenter/app.css)

## Run the App

Once you've completed all the coding, hit **F5** and Visual Studio will build / package / upload your App. As for every App you'll install on your tenant, SharePoint will first ask you to trust this App by presenting the following dialog

![SharePoint App Trust Dialog](images/exercises/trust_question.png)

After trusting the App, you'll be redirected to your SearchCenter App where you can search for any term you're interested in.

![SearchCenter App](images/exercises/searchcenter_app.png)

## Download the Source

The entire source-code for this example can be downloaded [here](http://1drv.ms/1BU2e70)
