## Hello ShareCoffee

### Your first SharePoint App with ShareCoffee

There isn't a better way to get started with a framework as actually using it.

  * Start **Visual Studio 2013** by using the **Run as administrator** option
  * Create a new project using FILE | NEW | PROJECT
  * From the **New Project** dialog choose VISUAL C# | OFFICE/SHAREPOINT and select **App for SharePoint**
  * Provide **HelloShareCoffee** as name and hit **OK**
  * In **SharePoint App wizard** provide your **Developer-Site's url**

![SharePoint App Wizard in Visual Studio 2013](images/GettingStarted/app_wizard.png)

T> ## SharePoint App Hosting Options
T> All the different hosting options were discussed in Chapter One, if you're not using the recent VS 2013 Update (Update 3) you may see the term Autohosted App right here. Autohosted Apps are depricated, so currently there are only two real options.
T> If you've already created Autohosted Apps for SharePoint read [this article for more inforation](http://blogs.office.com/2014/05/16/update-on-autohosted-apps-preview-program/)

For this sample lets choose **SharePoint-Hosted** as type of the App and click **Finish**. Depending on your system configuration, you've to provide your Office 365 credentials now in order to access the Developer Site. After providing them, Visual Studio is going to spin up the project.

Open the **Package Manager Console** by focusing the VS2013's new **Quick Launch** and start typing **Package Manager Console**. From the list of results select **View -> Other Windows -> Package Manager Console**

![Visual Studio 2013's Quick Launch](images/GettingStarted/quicklaunch.png)

In the Package Manage console type

    Install-Package ShareCoffee

At this point ShareCoffee will be installed into your App project (revisit the Scripts Folder).

### Updating Default.aspx

Default.aspx is responsible for actually presenting your App and it's the page that will be shown when an user clicks on your App-Tile.

You can find the Default.aspx underneath **Pages** open it by double-clicking it. Look for a comment like this

    <!-- Add your JavaScript to the following file -->

Load ShareCoffee right here by referencing the minified ShareCoffee JavaScript file

    <script type="text/javascript"
            src="../Scripts/ShareCoffee/ShareCoffee.min.js">
    </script>

Within the **PlaceHolderMain Content Control** remove all the content and replace it with the following HTML

{title="Hello World UI",lang=html}
~~~~~~
    <h1>Hello ShareCoffee</h1>
    <h4> AppWeb Url:
      <span id="appWebUrl"></span>
    </h4>
    <h4> HostWeb Url:
      <span id="hostWebUrl"></span>
    </h4>
    <h4> API Root Url:
      <span id="apiRootUrl"></span>
    </h4>
    <h4> Form Digest:
      <span id="formDigest"></span>
    </h4>
~~~~~~

### Updating App.js

Finally the JavaScript logic has to be changed, open the App.js file by double-clicking it. (It's located in the Scripts folder). Delete **all the content** from the JavaScript file and write the following few lines of JavaScript code.

{title="Hello World logic",lang=javascript}
~~~~~~
    $(document).ready(function() {

      $("#appWebUrl").text(ShareCoffee.Commons.getAppWebUrl());
      $("#hostWebUrl").text(ShareCoffee.Commons.getHostWebUrl());

      $("#apiRootUrl").text(ShareCoffee.Commons.getApiRootUrl());
      $("#formDigest").text(ShareCoffee.Commons.getFormDigest());
    });
~~~~~~

The script is really straight forward. It's piping the result values from ShareCoffee's methods directly to each span's **text** method.

### Testing the App

 Install and test your SharePoint-Hosted App by hitting **F5** in Visual Studio. Visual Studio will now package your SharePoint App. Once packaging is finished, the App package will be uploaded and installed in your Office 365 Developer Site using a technology called **Side Loading**.

 Your default browser should now popup and load your App's start-page. If you've followed all the steps described above, your browser should present something similar to this

 ![Sample 1 Result](images/GettingStarted/sample1_result.png)
