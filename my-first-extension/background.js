importScripts('/libs/browser-polyfill.min.js');

// This tells the browser to listen for the 'onInstalled' event
// When the event happens, it runs the function
browser.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");                                // Message's will be sent to the bg scrip'ts console
});