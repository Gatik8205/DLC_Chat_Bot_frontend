import { useState, useRef, useEffect } from "react"
import ChatHeader from "./components/ChatHeader"
import MessageBubble from "./components/MessageBubble"
import TypingIndicator from "./components/TypingIndicator"
import SuggestionChips from "./components/SuggestionChips"
import InputBar from "./components/InputBar"

const API_URL = "https://dlc-chat-bot-backend.onrender.com/chat"

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Namaste! I'm your DLC Assistant. Ask me anything about WhatsApp, Paytm, or Google Maps.",
      time: getTime(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [lang, setLang] = useState("en")
  const bottomRef = useRef(null)

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("dlc-theme") === "dark"
    if (saved) document.documentElement.classList.add("dark")
    return saved
  })

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Namaste! I'm your DLC Assistant. Ask me anything about WhatsApp, Paytm, or Google Maps.",
        time: getTime(),
      },
    ])
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    localStorage.setItem("dlc-theme", darkMode ? "dark" : "light")
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const sendMessage = async (text) => {
    const userMsg = { sender: "user", text, time: getTime() }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, lang }),
      })

      if (!res.ok) throw new Error("Server error")

      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply, time: getTime() },
      ])
    } catch (_err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Failed to get a response. Please check your internet or try again later.",
          time: getTime(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden" style={{ height: "90vh" }}>

        <ChatHeader
          lang={lang}
          setLang={setLang}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          onClear={clearChat}
        />

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        <SuggestionChips onSelect={sendMessage} />
        <InputBar onSend={sendMessage} disabled={isTyping} />

      </div>
    </div>
  )
}

export default App