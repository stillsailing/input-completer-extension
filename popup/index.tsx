import "~/css/tailwind.css"
import "~/css/base.css"

import { sendToMainTabContent } from "~/util/send"

import AsyncComplete from "./AsyncComplete"
import Header from "./Header"
import SyncComplete from "./SyncComplete"

document.addEventListener("DOMContentLoaded", () => {
  sendToMainTabContent("reactivateInput")
})

function IndexPopup() {
  return (
    <div className="h-96 w-96 text-sm">
      <Header />
      <main className="p-4">
        <div className="space-y-2">
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="complete-accordion" defaultChecked />
            <div className="collapse-title font-bold">同步补全</div>
            <div className="collapse-content">
              <SyncComplete />
            </div>
          </div>
          <div className="collapse collapse-arrow bg-base-200">
            <input type="radio" name="complete-accordion" />
            <div className="collapse-title font-bold">异步补全</div>
            <div className="collapse-content">
              <AsyncComplete />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default IndexPopup
