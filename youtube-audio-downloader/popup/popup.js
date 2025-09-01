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

async function handleDownload() {
    console.log("Download button clicked");

    let [tab] = await browser.tabs.query({ active: true, currentWindow: true });        // 1. Get the active tab to find its URL
    if (!tab || !tab.url) {
        console.error("Could not get actiba tab URL");
        return;
    }

    const serviceUrl = "https://www.yt2mp3s.com/api/button/mp3/";
    const videoId = new URL(tab.url).searchParams.get('v');
    const downloadUrl = `${serviceUrl}${videoId}`;

    console.log(`Attempting to download from: ${downloadUrl}`);

    const sanitizedTitle = videoTitleElement.innerText.replace(/[/\\?%*:|"<>]/g, '_');
    
    browser.downloads.download({
        url: downloadUrl,
        filename: `${sanitizedTitle}.mp3`
    }).then(
        () => console.log("Download started"),
        (error) => console.error(`Download failed: ${error}`)
    );
}


document.addEventListener('DOMContentLoaded', setupPopup);
document.addEventListener('click', handleDownload);