import cssText from "data-text:~/css/tailwind.css"
import type { PlasmoCSConfig } from "plasmo"

import { useSyncCompleteListStore } from "~/store/sync"

import useLatestInput from "./useLatestInput"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const Content = () => {
  const { input, actived } = useLatestInput()

  function complete(text: string, mode: "append" | "replace" = "append") {
    if (!input) {
      return
    }
    if (mode === "append") {
      input.value += text
    }
    if (mode === "replace") {
      input.value = text
    }
    const event = new Event("input", { bubbles: true, cancelable: true })
    input.dispatchEvent(event)
  }

  const { list } = useSyncCompleteListStore()

  if (!actived) return null

  return (
    <div
      id="input-complete-extension"
      className="fixed right-10 top-10 bg-white rounded shadow-lg px-4 py-2 w-48 min-h-32">
      {list.length === 0 && (
        <div className="text-gray-500 text-center text-sm flex justify-center items-center">
          <span>暂无数据</span>
        </div>
      )}
      {list.length > 0 && (
        <ul>
          {list.map((item) => (
            <li key={item.id} className="p-2 rounded hover:bg-gray-50">
              <div
                className="tooltip tooltip-right"
                data-tip={item.completeText}>
                <pre className="overflow-hidden">{item.title}</pre>
              </div>
              <div className="flex items-center justify-end mt-2">
                <div className="join">
                  <button
                    className="btn btn-xs join-item"
                    onClick={() => complete(item.completeText, "replace")}>
                    替换
                  </button>
                  <button
                    className="btn btn-xs join-item"
                    onClick={() => complete(item.completeText, "append")}>
                    追加
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Content
