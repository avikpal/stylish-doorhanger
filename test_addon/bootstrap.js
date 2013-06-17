//to check the current state of input buttons
const Cc = Components.classes;
const Ci = Components.interfaces;
var menuID;

function offerCake(window) {
  let buttons = [
    {
      label: "Yes, please!",
      callback: function () {
        window.NativeWindow.toast.show("yum", "short");
      }
    },
    {
      label: "Not today",
      callback: function () {
        window.NativeWindow.toast.show("still hungry", "short");
      }
    }
  ];
  let message = "How about some cake?";
  let options = {
    persistence: 1
  };
  window.NativeWindow.doorhanger.show(message, "cake-request", buttons, window.BrowserApp.selectedTab.id, options);
}

function loadIntoWindow(window) {
  if (!window)
    return;
  menuID = window.NativeWindow.menu.add("Offer cake", null, function(){  
    offerCake(window);   
  });
}

function unloadFromWindow(window) {
  if (!window)
    return;
  window.NativeWindow.menu.remove(menuID);  
}

var windowListener = {
  onOpenWindow: function(aWindow) {
    // Wait for the window to finish loading
    let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
    domWindow.addEventListener("load", function() {
      domWindow.removeEventListener("load", arguments.callee, false);
      loadIntoWindow(domWindow);
    }, false);
  },
onCloseWindow: function(aWindow) {alert("window closed"); },
onWindowTitleChange: function(aWindow, aTitle) {}
};

function startup(aData, aReason) {
  //let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
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













