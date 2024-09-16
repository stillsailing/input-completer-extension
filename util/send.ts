import { sendToContentScript } from "@plasmohq/messaging"

export function sendToMainTabContent(type: string, payload?: any) {
  return new Promise<void>((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendToContentScript({
        tabId: tabs[0].id,
        name: type,
        body: {
          type,
          payload
        }
      })
      resolve()
    })
  })
}
