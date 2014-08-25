var settingsLink1 = new ShareCoffee.SettingsLink(
  'foo.html', //Path for the SettingsPage
  'Settings Page', // Page title
  true // use true to pass entire QueryString
);
var settingsLink2 = new ShareCoffee.SettingsLink(
  'profile.html', 'Your Profile', false);

var options = new ShareCoffee.ChromeSettings(
  iconUrl,  // path to the App icon
  'MyApp Title', // App's title
  'Help.aspx', // Path to your Help Page (optional)
  settingslink1,
  settingslink2 // it's a splat, provide as many SettingsLinks as you have to
);

ShareCoffee.UI.loadAppChrome("sp-chrome", options);