function getPageDetails() {
    const titleElement = document.querySelector("#title h1");
    return {
        title: titleElement ? titleElement.innerText : "Title Not Found"
    };
}

getPageDetails();