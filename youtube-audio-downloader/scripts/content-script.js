function getPageDetails() {
    const titleElement = document.querySelector("#title h1");
    const durationElement = document.querySelector(".ytp-time-duration");

    return {
        title: titleElement ? titleElement.innerText : "Title Not Found",
        length: durationElement ? durationElement.innerText : "00:00"
    };
}

getPageDetails();