const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/Services.jsm");

function isNativeUI() {
  return (Services.appinfo.ID == "{aa3c5121-dab2-40e2-81ca-7ea25febc110}");
}

function showDoorhanger(aWindow) {
  let message = "Showing various input elements";
  buttons = [
    {
      label: "ok",
      callback: function() {
        aWindow.NativeWindow.toast.show("its alright", "short");
      }
    } 
    ];
	
  aWindow.NativeWindow.doorhanger.show(message,"doorhanger-test", buttons,awindow.BrowserApp.selectedTab.id,{
  inputs [{ type: "checkbox", id: "check", label: "Label" value: true }]});
}

function copyLink(aWindow, aTarget) {
  let url = aWindow.NativeWindow.contextmenus._getLinkURL(aTarget);
  aWindow.NativeWindow.toast.show("Todo: copy > " + url, "short");
}

var gDoorhangerMenuId = null;

function loadIntoWindow(window) {
  if (!window)
    return;

  if (isNativeUI()) {
    gDoorhangerMenuId = window.NativeWindow.menu.add("show inputs", null, function() { showDoorhanger(window); });
  }
}

function unloadFromWindow(window) {
  if (!window)
    return;

  if (isNativeUI()) {
    window.NativeWindow.menu.remove(gDoorhangerMenuId);
  }
}


/**
 * bootstrap.js API
 */
var windowListener = {
  onOpenWindow: function(aWindow) {
    // Wait for the window to finish loading
    let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
    domWindow.addEventListener("load", function() {
      domWindow.removeEventListener("load", arguments.callee, false);
      loadIntoWindow(domWindow);
    }, false);
  },
  
  onCloseWindow: function(aWindow) {
  },
  
  onWindowTitleChange: function(aWindow, aTitle) {
  }
};

function startup(aData, aReason) {
  // Load into any existing windows
  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    loadIntoWindow(domWindow);
  }

  // Load into any new windows
  Services.wm.addListener(windowListener);
}

function shutdown(aData, aReason) {
  // When the application is shutting down we normally don't have to clean
  // up any UI changes made
  if (aReason == APP_SHUTDOWN)
    return;

  // Stop listening for new windows
  Services.wm.removeListener(windowListener);

  // Unload from any existing windows
  let windows = Services.wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    unloadFromWindow(domWindow);
  }
}

function install(aData, aReason) {
}

function uninstall(aData, aReason) {
}
