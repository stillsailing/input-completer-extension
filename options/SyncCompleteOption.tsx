import { useState } from "react"

import { useListStore } from "~/store/list"
import uuid from "~/util/uuid"

export default function SyncCompleteOption() {
  const store = useListStore()

  const [addMode, setAddMode] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const reset = () => {
    setAddMode(false)
    setTitle("")
    setContent("")
  }

  const allIds = store.list.map((o) => o.id)
  const [checked, setChecked] = useState<string[]>([])

  return (
    <>
      <div className="mt-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setAddMode(true)}>
          新增
        </button>
        <button className="btn btn-sm ml-2" onClick={() => {}}>
          删除
        </button>
      </div>
      <div className="border rounded my-2">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={`${checked === allIds}`}
                    onChange={() =>
                      setChecked(checked.join() === allIds.join() ? [] : allIds)
                    }
                  />
                </label>
              </th>
              <th>备注</th>
              <th>补全文本</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {store.list.map((item) => (
              <tr key={item.id} className="hover">
                <td>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      value={`${checked.includes(item.id)}`}
                      onChange={() =>
                        setChecked((checked) =>
                          checked.includes(item.id)
                            ? checked.filter((o) => o !== item.id)
                            : [...checked, item.id]
                        )
                      }
                    />
                  </label>
                </td>
                <td>{item.title}</td>
                <td>
                  <pre>{item.completeText}</pre>
                </td>
                <td>
                  <button
                    className="btn btn-link p-0 my-0"
                    onClick={() => store.remove(item.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
            {addMode && (
              <tr>
                <td></td>
                <td>
                  <input
                    placeholder="请输入备注"
                    className="input input-bordered input-sm w-full max-w-xs"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </td>
                <td>
                  <textarea
                    placeholder="请输入补全文本"
                    className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-link p-0 my-0"
                    onClick={() => {
                      store.add({
                        id: uuid(),
                        title,
                        completeText: content
                      })
                      reset()
                    }}>
                    确定
                  </button>
                  <button
                    className="btn btn-link p-0 my-0 ml-4"
                    onClick={reset}>
                    取消
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
