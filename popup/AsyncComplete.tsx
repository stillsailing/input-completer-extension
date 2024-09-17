import { useState } from "react"

import { sendToBackground, sendToMainTabContent } from "~/util/send"

import completers from "./completers"

export default function AsyncComplete() {
  const [loading, setLoading] = useState(false)

  return (
    <ul>
      {completers.map((item) => (
        <li
          key={item.id}
          className="hover:bg-gray-100 cursor-pointer p-2 rounded"
          onClick={async () => {
            setLoading(true)
            try {
              const resp = await sendToBackground({
                name: "get_input_value",
                body: {
                  type: "get_input_value"
                }
              })
              const completeText = await item.getCompleteText(resp)
              sendToMainTabContent("complete", completeText)
            } catch (error) {
            } finally {
              setLoading(false)
            }
          }}>
          {item.title}
        </li>
      ))}
      {loading && (
        <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-opacity-40 bg-white z-10 backdrop-filter backdrop-blur">
          <span className="loading loading-spinner loading-lg text-primary-600"></span>
        </div>
      )}
    </ul>
  )
}
