import cssText from "data-text:~/css/tailwind.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

import { sendToBackground } from "@plasmohq/messaging"
import type { PlasmoMessaging } from "@plasmohq/messaging"

const sendToTabBackground = sendToBackground as PlasmoMessaging.SendFx<string>

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

let latestInput: HTMLInputElement | HTMLTextAreaElement

document.addEventListener("focusin", (event: any) => {
  if (
    event.target.tagName.toLowerCase() === "input" ||
    event.target.tagName.toLowerCase() === "textarea"
  ) {
    latestInput = event.target
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.name === "reactivateInput" && latestInput) {
    latestInput.focus()
    // activeElement.style.outline = 'solid 2px #0000ff'
    // activeElement.style.outlineOffset = '2px'
  }

  if (request.name === "complete") {
    const content = request.body.payload
    if (latestInput) {
      latestInput.value += content
      latestInput.dispatchEvent(new Event("input"))
    }
  }
})

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

const Content = () => {
  useEffect(() => {
    document.addEventListener("keydown", watchHotkeys)
    return () => {
      document.removeEventListener("keydown", watchHotkeys)
    }
  }, [])

  return <div id="input-complete-extension" className="hidden"></div>
}

export default Content
