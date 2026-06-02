import { useState } from "react"
function InputBar({ onSend, disabled }) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim() === "" || disabled) return
    onSend(input.trim())
    setInput("")
  }

  return (
    <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your question..."
        disabled={disabled}
        className="flex-1 bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 rounded-full px-4 py-2 outline-none border border-transparent focus:border-blue-300 dark:focus:border-blue-600 transition-all disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all"
      >
        <span className="text-white text-sm">➤</span>
      </button>
    </div>
  )
}

export default InputBar