/* console.log("My content scripts is running.");          // It can modify aspects of the site page

document.body.style.backgroundColor = "purple";*/

browser.runtime.onMessage.addListener((message) => {                // Adds a listener for msgs from other parts of the extension
    
    // The 'message' object is whatever it's sent from 'popup.js'
    // 'if' condition to check the action
    if (message.action === "changeColor") {
        console.log("Received a message to change the color.");
        document.body.style.backgroundColor = "purple";
    }
});