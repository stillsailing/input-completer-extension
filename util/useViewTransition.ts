import { useLayoutEffect, useRef } from "react"

export default function useViewTransition(update: () => void) {
  const resolveRef = useRef<() => void>()

  const support = "startViewTransition" in document

  useLayoutEffect(() => {
    if (support && resolveRef.current) {
      resolveRef.current()
      resolveRef.current = undefined
    }
  })

  if (support) {
    return function updateWithTransition() {
      document.startViewTransition(() => {
        return new Promise<void>((resolve) => {
          update()
          resolveRef.current = resolve
        })
      })
    }
  }
  return update
}
