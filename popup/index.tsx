import "~/css/tailwind.css"
import "~/css/base.css"

import { sendToContentScript } from "@plasmohq/messaging"

import { useListStore } from "~/store/list"

import Header from "./Header"

function sendToMainTabContent(type: string, payload?: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    sendToContentScript({
      tabId: tabs[0].id,
      name: type,
      body: {
        type,
        payload
      }
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  sendToMainTabContent("reactivateInput")
})

function IndexPopup() {
  const store = useListStore()

  return (
    <div className="h-96 w-96">
      <Header />
      <main className="p-4">
        <ul className="">
          {store.list.map((item) => (
            <li
              key={item.id}
              className="hover:bg-gray-100 cursor-pointer p-2 rounded"
              onClick={() =>
                sendToMainTabContent("complete", item.completeText)
              }>
              {item.completeText}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default IndexPopup
