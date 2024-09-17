import cssText from "data-text:~/css/tailwind.css"
import type { PlasmoCSConfig } from "plasmo"

import watch from "./watch"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

watch()

const Content = () => {
  return <div id="input-complete-extension" className="hidden"></div>
}

export default Content
