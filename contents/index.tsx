import cssText from "data-text:~/css/tailwind.css"
import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

import watch from "./watch"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Content = () => {
  useEffect(() => watch(), [])

  return <div id="input-complete-extension" className="hidden"></div>
}

export default Content
