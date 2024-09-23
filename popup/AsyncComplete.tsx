import { useState } from "react"

import complete from "~/util/complete"
import { sendToBackground } from "~/util/send"

import completers, { type AsyncCompleter } from "./completers"

export default function AsyncComplete() {
  return (
    <>
      {completers.map((item) => (
        <Item key={item.id} completer={item} />
      ))}
    </>
  )
}

const Item = (props: { completer: AsyncCompleter }) => {
  const { getCompleteText, title } = props.completer
  const [loading, setLoading] = useState(false)

  async function clickHandler(mode) {
    setLoading(true)
    try {
      const resp = await sendToBackground({
        name: "get_input_value",
        body: {
          type: "get_input_value"
        }
      })
      const completeText = await getCompleteText(resp)
      if (completeText) {
        complete(completeText, mode)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <li className="hover:bg-gray-100 cursor-pointer p-2 relative">
      <pre className="overflow-hidden">{title}</pre>
      <div className="flex items-center justify-end mt-2">
        <div className="join">
          <button
            className="btn btn-xs join-item"
            onClick={() => clickHandler("replace")}>
            替换
          </button>
          <button
            className="btn btn-xs join-item"
            onClick={() => clickHandler("append")}>
            追加
          </button>
        </div>
      </div>
      {loading && (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-opacity-40 bg-white z-10 backdrop-filter backdrop-blur">
          <span className="loading loading-spinner loading-lg text-primary-600"></span>
        </div>
      )}
    </li>
  )
}
