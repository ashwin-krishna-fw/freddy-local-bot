chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getReactURL") {
        sendResponse({ url: chrome.runtime.getURL("freddy/dist/index.html") });
    }
});
