import { useListStore } from "~/store/list"
import { sendToMainTabContent } from "~/util/send"
import useFetcher from "~/util/useFetcher"

export default function AsyncComplete() {
  const store = useListStore()
  const { loading, fetch } = useFetcher((text: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        sendToMainTabContent("complete", text)
        resolve()
      }, 3000)
    })
  })

  return (
    <ul>
      {store.list.map((item) => (
        <li
          key={item.id}
          className="hover:bg-gray-100 cursor-pointer p-2 rounded"
          onClick={() => fetch("async complete text")}>
          {item.completeText}
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
