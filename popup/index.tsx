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
    <div className="min-h-96 max-h-[720px] w-[560px] text-sm font-sans">
      <Header />
      <main className="p-2">
        <div className="space-y-2 divide-y">
          <ul className="divide-y">
            <SyncComplete />
            <AsyncComplete />
          </ul>
        </div>
      </main>
    </div>
  )
}

export default IndexPopup
