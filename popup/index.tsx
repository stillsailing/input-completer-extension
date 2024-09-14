import "~/css/tailwind.css";

import { sendToContentScript } from "@plasmohq/messaging"

function sendToMainTabContent(type: string, payload?: any) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    sendToContentScript({
      tabId: tabs[0].id,
      name: type,
      body: {
        type,
        payload,
      }
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  sendToMainTabContent("reactivateInput")
})

function IndexPopup() {
  return (
    <div className="flex items-center justify-center h-96 w-96">
      <div className="">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality</td>
              <td>
                <button className="btn-link" onClick={() => sendToMainTabContent('complete', 'first')}>add</button>
              </td>
            </tr>
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop</td>
              <td>
                <button className="btn-link" onClick={() => sendToMainTabContent('complete', 'second')}>add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IndexPopup