import "~/css/tailwind.css"
import "~/css/base.css"

import SyncCompleteOption from "./SyncCompleteOption"

function OptionsIndex() {
  return (
    <div className="mx-auto max-w-5xl pt-6 px-4">
      <h1 className="text-xl">配置页面</h1>
      <div role="tablist" className="tabs tabs-lifted mt-2">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="同步补全"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-4">
          <SyncCompleteOption />
        </div>
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 2"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          Tab content 2
        </div>
      </div>
    </div>
  )
}

export default OptionsIndex
