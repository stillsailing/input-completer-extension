import cssText from "data-text:~/css/tailwind.css";
import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

let activeElement: HTMLInputElement | HTMLTextAreaElement

document.addEventListener("focusin", (event: any) => {
  if (
    event.target.tagName.toLowerCase() === "input" ||
    event.target.tagName.toLowerCase() === "textarea"
  ) {
    activeElement = event.target
  }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.name === "reactivateInput" && activeElement) {
    activeElement.focus()
    // activeElement.style.outline = 'solid 2px #0000ff'
    // activeElement.style.outlineOffset = '2px'
  }

  if (request.name === 'complete') {
    const content = request.body.payload
    if (activeElement) {
      activeElement.value += content
      activeElement.dispatchEvent(new Event('input'))
    }
  }
  
})

const Content = () => {
  return (
    <div className="hidden">
    </div>
  )
}

export default Content
