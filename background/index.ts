let lastValue = ""

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.name === "open-popup") {
    chrome.action.openPopup()
  }

  if (request.name === "input-value") {
    lastValue = request.body.payload || ""
  }

  if (request.name === "get_input_value") {
    sendResponse(lastValue || "")
  }
})
