import "~/css/tailwind.css"
import "~/css/base.css"

import SyncCompleteOption from "./SyncCompleteOption"

function Options() {
  return (
    <div className="mx-auto max-w-5xl pt-6 px-4">
      <h1 className="text-xl">配置页面</h1>
      <SyncCompleteOption />
    </div>
  )
}

export default Options
