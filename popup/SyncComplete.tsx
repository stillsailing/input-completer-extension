import { useSyncCompleteListStore } from "~/store/sync"
import complete from "~/util/complete"

export default function SyncComplete() {
  const store = useSyncCompleteListStore()
  return (
    <>
      {store.list.map((item) => (
        <li key={item.id} className="p-2 rounded hover:bg-gray-50">
          <div className="tooltip tooltip-right" data-tip={item.completeText}>
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
    </>
  )
}
