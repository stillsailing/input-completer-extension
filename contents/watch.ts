import { sendToBackground } from "~/util/send"

function watchHotkeys(event: KeyboardEvent) {
  const isCmdOrCtrl = event.metaKey || event.ctrlKey
  const isShift = event.shiftKey
  const isC = event.key === "k" || event.key === "K"

  if (isCmdOrCtrl && isShift && isC) {
    sendToBackground({
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
      sendToBackground({
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
      const { mode, completeText } = request.body.payload
      if (latestInput) {
        if (mode === "append") {
          latestInput.value += completeText
        }
        if (mode === "replace") {
          latestInput.value = completeText
        }
        const event = new Event("input", { bubbles: true, cancelable: true })
        latestInput.dispatchEvent(event)
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
