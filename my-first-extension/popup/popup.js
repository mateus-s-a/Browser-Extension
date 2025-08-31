const title = document.getElementById('title');             // Gets the 'title' h1 reference

title.addEventListener('click', () => {                     // Add a 'click' in 'title' h1 reference
    console.log("Title clicked. Sending message.");

    browser.runtime.sendMessage({                           // Send a msg to other parts of the extension
        action: "changeColor"
    });
});