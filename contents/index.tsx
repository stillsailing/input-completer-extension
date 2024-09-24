import cssText from "data-text:~/css/tailwind.css"
import type { PlasmoCSConfig } from "plasmo"
import { useState } from "react"
import { FaRegEyeSlash } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md"

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
  const { inputRef, actived } = useLatestInput()

  function complete(text: string, mode: "append" | "replace" = "append") {
    if (!inputRef.current) {
      return
    }
    if (mode === "append") {
      inputRef.current.value += text
    }
    if (mode === "replace") {
      inputRef.current.value = text
    }
    const event = new Event("input", { bubbles: true, cancelable: true })
    inputRef.current.dispatchEvent(event)
  }

  const { list } = useSyncCompleteListStore()

  const [expand, setExpand] = useState(false)
  const toggle = () => setExpand((v) => !v)

  if (!inputRef.current) return null

  return (
    <div
      id="input-complete-extension"
      className="fixed right-0 top-10 bg-slate-50 rounded shadow-lg px-4 py-2 transition-transform">
      <div className="cursor-pointer" onClick={toggle}>
        {expand ? (
          <FaRegEyeSlash size={24} />
        ) : (
          <MdOutlineRemoveRedEye size={24} />
        )}
      </div>
      {expand && (
        <div>
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
      )}
    </div>
  )
}

export default Content
