function ChatHeader({ lang, setLang, darkMode, setDarkMode, onClear }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
          <span className="text-lg">🤖</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">DLC Assistant</p>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Online · Digital literacy guide</p>
          </div>
        </div>
        <button
        onClick={onClear}
        className="text-gray-400 hover:text-red-400 transition-colors text-sm px-2"
        title="Clear chat"
        >
          🗑️
          </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-xl px-2"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      <div className="flex gap-2 px-4 pb-3">
        <button
          onClick={() => setLang("en")}
          className={`text-xs px-3 py-1 rounded-full border transition-all ${
            lang === "en"
              ? "bg-blue-100 text-blue-700 border-blue-300 font-medium"
              : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setLang("hi")}
          className={`text-xs px-3 py-1 rounded-full border transition-all ${
            lang === "hi"
              ? "bg-blue-100 text-blue-700 border-blue-300 font-medium"
              : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          }`}
        >
          हिंदी
        </button>
      </div>
    </div>
  )
}

export default ChatHeader