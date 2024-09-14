
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.name === "open-popup") {
    chrome.action.openPopup();
  }
})
