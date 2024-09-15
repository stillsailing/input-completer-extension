export default function Header() {
  return (
    <header className="flex items-center justify-between h-6 w-full px-2 py-6 border-b shadow-sm">
      <h1 className="text-2xl font-bold">Input Completer</h1>
      <button
        className="btn btn-link underline-offset-2"
        onClick={() => {
          if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage()
            return
          }
          window.open(chrome.runtime.getURL("options.html"))
        }}>
        配置
      </button>
    </header>
  )
}
