export default function fetchDemo1(input: string) {
  console.log(input)

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("async [" + input + "] demo1 text")
    }, 2000)
  })
}
