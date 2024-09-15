import "~/css/tailwind.css"
import "~/css/base.css"

import { useState } from "react"

import { useListStore } from "~/store/list"
import uuid from "~/util/uuid"

function OptionsIndex() {
  const store = useListStore()

  const [addMode, setAddMode] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <div className="mx-auto max-w-5xl pt-6 px-4">
      <h1>
        Welcome to your <a href="https://www.plasmo.com">Plasmo</a> Extension!
      </h1>
      <h2>This is the Option UI page!</h2>
      <div className="mt-4">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setAddMode(true)}>
          新增
        </button>
        <button className="btn btn-sm ml-2" onClick={() => {}}>
          删除
        </button>
      </div>
      <main className="border rounded my-2">
        <table className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>备注</th>
              <th>补全文字</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {store.list.map((item) => (
              <tr key={item.id} className="hover">
                <td>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </td>
                <td>{item.title}</td>
                <td>{item.completeText}</td>
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
                    className="input input-bordered input-sm w-full max-w-xs"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    className="input input-bordered input-sm w-full max-w-xs"
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
                      setAddMode(false)
                      setTitle("")
                      setContent("")
                    }}>
                    确定
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default OptionsIndex
