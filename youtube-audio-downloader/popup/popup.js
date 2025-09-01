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
        console.error("Could not get active tab URL");
        return;
    }

    const videoUrl = new URL(tab.url);                                                  // 2. Get the video ID from the tab's URL
    const videoId = videoUrl.searchParams.get('v');
    if (!videoId) {
        console.error("Could not extract video ID from URL");
        return;
    }

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '06873e9a9dmsh5690bf7dfbb2161p1dd49ejsn9c64de50c7a6',
            'X-RapidAPI-Host': 'tube-mp31.p.rapidapi.com'
        },
        body: JSON.stringify({ videoId: videoId })
    };

    try {
        console.log(fetchOptions);
        
        const response = await fetch('https://tube-mp31.p.rapidapi.com/api/json', fetchOptions);
        console.log(response);

        const result = await response.json();
        console.log(result);

        if (result.status === 'success' && result.result && result.result[0].dlurl) {
            const downloadUrl = result.result[0].dlurl;
            console.log(`Success. Download link received: ${downloadUrl}`);

            const sanitizedTitle = videoTitleElement.innerText.replace(/[/\\?%*:|"<>]/g, '_');
            browser.downloads.download({
                url: downloadUrl,
                filename: `${sanitizedTitle}.mp3`
            });
        } else {
            console.error("API did not return a success status or download link", result);
        }
    } catch (error) {
        console.error("Failed to fetch from API:", error);
    }
}


document.addEventListener('DOMContentLoaded', setupPopup);
downloadBtn.addEventListener('click', handleDownload);