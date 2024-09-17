export default function fetchDemo2() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("async demo2 text")
    }, 2500)
  })
}
