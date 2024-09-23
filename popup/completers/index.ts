import fetchDemo1 from "./demo1"
import fetchDemo2 from "./demo2"

export interface AsyncCompleter {
  id: string
  title: string
  getCompleteText: (input?: string) => Promise<string>
}

const completers: AsyncCompleter[] = [
  {
    id: "demo1",
    title: "Demo 1",
    getCompleteText: fetchDemo1
  },
  {
    id: "demo2",
    title: "Demo 2",
    getCompleteText: fetchDemo2
  }
]

export default completers
