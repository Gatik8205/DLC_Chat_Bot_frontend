function MessageBubble({ message }) {
  const isUser = message.sender === "user"

  const copyToClipboard = (text) => {
    const plain = text.replace(/<[^>]+>/g, "")
    navigator.clipboard.writeText(plain)
  }

  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0 mb-1">
          <span className="text-xs">🤖</span>
        </div>
      )}

      <div className={`max-w-[78%]`}>
        <div
          className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
            isUser
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-sm"
          }`}
        >
          {isUser ? (
            <p>{message.text}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: message.text }} />
          )}
        </div>

        <div className={`flex items-center gap-2 mt-1 ${isUser ? "justify-end" : "justify-start"}`}>
          <span className="text-xs text-gray-400">{message.time}</span>
          {!isUser && (
            <button
              onClick={() => copyToClipboard(message.text)}
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              title="Copy"
            >
              📋
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageBubble