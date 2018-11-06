cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-ionic-keyboard.keyboard",
    "file": "plugins/cordova-plugin-ionic-keyboard/www/android/keyboard.js",
    "pluginId": "cordova-plugin-ionic-keyboard",
    "clobbers": [
      "window.Keyboard"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-sqlite-storage.SQLitePlugin",
    "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
    "pluginId": "cordova-sqlite-storage",
    "clobbers": [
      "SQLitePlugin"
    ]
  },
  {
    "id": "cordova-plugin-filechooser.FileChooser",
    "file": "plugins/cordova-plugin-filechooser/www/fileChooser.js",
    "pluginId": "cordova-plugin-filechooser",
    "clobbers": [
      "fileChooser"
    ]
  },
  {
    "id": "cordova-clipboard.Clipboard",
    "file": "plugins/cordova-clipboard/www/clipboard.js",
    "pluginId": "cordova-clipboard",
    "clobbers": [
      "cordova.plugins.clipboard"
    ]
  },
  {
    "id": "cordova-plugin-qrscanner.QRScanner",
    "file": "plugins/cordova-plugin-qrscanner/www/www.min.js",
    "pluginId": "cordova-plugin-qrscanner",
    "clobbers": [
      "QRScanner"
    ]
  },
  {
    "id": "ElaJava2JSBridge.Java2JSBridge",
    "file": "plugins/ElaJava2JSBridge/www/Java2JSBridge.js",
    "pluginId": "ElaJava2JSBridge",
    "clobbers": [
      "cordova.plugins.Java2JSBridge"
    ]
  },
  {
    "id": "ElaWallet.Wallet",
    "file": "plugins/ElaWallet/www/Wallet.js",
    "pluginId": "ElaWallet",
    "clobbers": [
      "cordova.plugins.Wallet"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-device": "2.0.2",
  "cordova-plugin-ionic-keyboard": "2.0.5",
  "cordova-plugin-ionic-webview": "1.1.19",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-sqlite-storage": "2.3.1",
  "cordova-plugin-filechooser": "1.0.1",
  "cordova-clipboard": "1.2.1",
  "cordova-plugin-qrscanner": "2.6.0",
  "ElaJava2JSBridge": "1",
  "ElaWallet": "1.0.0"
};
// BOTTOM OF METADATA
});