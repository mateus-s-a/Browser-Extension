const videoTitleElement = document.getElementById('videoTitle');
const videoLengthElement = document.getElementById('videoLength');
const downloadBtn = document.getElementById('downloadBtn');
const cancelBtn = document.getElementById('cancelBtn');
const versionElement = document.getElementById('version');



async function setupPopup() {
    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    let results = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['/scripts/content-script.js']
    });

    const { title, length } = results[0].result;
    
    videoTitleElement.innerText = title;
    videoLengthElement.innerText = length;
}

document.addEventListener('DOMContentLoaded', setupPopup);