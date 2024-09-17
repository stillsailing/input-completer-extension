import {
  sendToContentScript,
  sendToBackground as sendToExtensionBackground
} from "@plasmohq/messaging"
import type { PlasmoMessaging } from "@plasmohq/messaging"

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
      }).then(() => resolve())
    })
  })
}

export const sendToBackground =
  sendToExtensionBackground as PlasmoMessaging.SendFx<string>
