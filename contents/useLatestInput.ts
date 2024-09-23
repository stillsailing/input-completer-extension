import { useEffect, useRef, useState } from "react"

export default function useLatestInput() {
  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const [actived, setActived] = useState(false)

  useEffect(() => {
    function focusinHandler(event) {
      if (
        event.target.tagName.toLowerCase() === "input" ||
        event.target.tagName.toLowerCase() === "textarea"
      ) {
        ref.current = event.target
        setActived(true)
      }
    }
    function focusoutHandler(event) {
      if (ref.current === event.target) {
        setTimeout(() => {
          setActived(false)
        }, 300)
      }
    }
    document.addEventListener("focusin", focusinHandler)
    document.addEventListener("focusout", focusoutHandler)
    return () => {
      document.removeEventListener("focusin", focusinHandler)
      document.removeEventListener("focusout", focusoutHandler)
    }
  }, [])

  return {
    input: ref.current,
    actived
  }
}
