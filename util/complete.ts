import { sendToMainTabContent } from "./send"

export default function complete(
  completeText: string,
  mode: "append" | "replace" = "append"
) {
  return sendToMainTabContent("complete", {
    mode,
    completeText
  })
}
