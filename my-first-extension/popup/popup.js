const title = document.getElementById('title');             // Gets the 'title' h1 reference

async function handleClick() {
    let tabs = await browser.tabs.query({ active: true, currentWindow: true });

    if (tabs.length > 0) {
        let activeTab = tabs[0];
        browser.tabs.sendMessage(activeTab.id, {
            action: "changeColor"
        });
    }
}

title.addEventListener('click', handleClick);