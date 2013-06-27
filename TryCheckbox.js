//code snippet to show  checkbox and other non spinner input elements
NativeWindow.doorhanger.show("Hi", "hello", [ label: "ok" ], window.BrowserApp.selectedTab.id, {
  inputs [
    { type: "checkbox", id: "check", label: "Label" value: true },
    { type: "input", id: "input", hint: "Enter something", value: "" },
    { type: "password", id: "pass", hint: "Password!", value: "" },
// HTML should work here...
    { type: "label", id: "l", value: "<b>Bold</b><a href='http://www.mozilla.org/en-US/'>Moz</a>" },
// I don't expect these to ever be useful, but you can see if you want
    { type: "datetime-local", id: "d" },
    { type: "week", id: "w" },
    { type: "date", id: "d2" },
    { type: "time", id: "t" },
    { type: "moth", id: "m" },
// This one is already somewhat styled
    { type: "menulist", id: "menu", values: ["One", "Two"], label: "My values" },
  ],
});
