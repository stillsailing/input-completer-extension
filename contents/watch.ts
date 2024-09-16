import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoMessaging } from "@plasmohq/messaging"

const sendToTabBackground = sendToBackground as PlasmoMessaging.SendFx<string>

function watchHotkeys(event: KeyboardEvent) {
  const isCmdOrCtrl = event.metaKey || event.ctrlKey
  const isShift = event.shiftKey
  const isC = event.key === "k" || event.key === "K"

  if (isCmdOrCtrl && isShift && isC) {
    sendToTabBackground({
      name: "open-popup",
      body: {
        type: "open-popup"
      }
    })
    event.preventDefault()
  }
}

export default function watch() {
  let latestInput: HTMLInputElement | HTMLTextAreaElement

  function watchInputValue() {
    if (latestInput) {
      const value = latestInput.value
      sendToTabBackground({
        name: "input-value",
        body: {
          type: "input-value",
          payload: value
        }
      })
    }
  }

  document.addEventListener("focusin", (event: any) => {
    if (
      event.target.tagName.toLowerCase() === "input" ||
      event.target.tagName.toLowerCase() === "textarea"
    ) {
      if (latestInput) {
        latestInput.removeEventListener("input", watchInputValue)
      }
      latestInput = event.target
      latestInput.addEventListener("input", watchInputValue)
    }
  })

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name === "complete") {
      const content = request.body.payload
      if (latestInput) {
        latestInput.value += content
        latestInput.dispatchEvent(new Event("input"))
      }
    }
  })

  document.addEventListener("keydown", watchHotkeys)

  return () => {
    if (latestInput) {
      latestInput.removeEventListener("input", watchInputValue)
    }
    document.removeEventListener("keydown", watchHotkeys)
  }
}
