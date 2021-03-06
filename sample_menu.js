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
//document.addEventListener('DOMContentLoaded',loadIntoWindow(window),false);

