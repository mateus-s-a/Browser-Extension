const title = document.getElementById('title');             // Gets the 'title' h1 reference

async function handleClick() {                                                          // 'async' function to have 'await'
    let tabs = await browser.tabs.query({ active: true, currentWindow: true });         // 1. Ask the browser for the active tab

    if (tabs.length > 0) {                                                              // 2. If it found one, send a message directly to it
        let activeTab = tabs[0];
        browser.tabs.sendMessage(activeTab.id, {
            action: "changeColor"
        });
    }
}

title.addEventListener('click', handleClick);               // Add the click event to the 'handleClicl()' function