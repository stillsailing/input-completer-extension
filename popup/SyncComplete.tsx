import { useSyncCompleteListStore } from "~/store/sync"
import { sendToMainTabContent } from "~/util/send"

export default function SyncComplete() {
  const store = useSyncCompleteListStore()
  return (
    <ul>
      {store.list.map((item) => (
        <li
          key={item.id}
          className="hover:bg-gray-100 cursor-pointer p-2 rounded"
          onClick={() => sendToMainTabContent("complete", item.completeText)}>
          {item.completeText}
        </li>
      ))}
    </ul>
  )
}
