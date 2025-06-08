let isBotResponding = false;

// Append message to chat
function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
    if (sender === "bot") {
    messageDiv.innerHTML = text;
  } else {
    messageDiv.textContent = text;
  }
  document.getElementById("chat-messages").appendChild(messageDiv);
  document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
}

// Handle send button
function sendMessage() {
  const input = document.getElementById("user-input");
  const userMessage = input.value.trim();

  if (userMessage === "") {
    appendMessage("bot", "❗ Please enter a message before sending.");
    return;
  }

  if (isBotResponding) {
    appendMessage("bot", "⏳ Please wait for the current response to finish.");
    return;
  }

  appendMessage("user", userMessage);
  input.value = "";

  // Animate paper plane icon
  const icon = document.getElementById("plane-icon");
  icon.classList.add("send-animation");
  setTimeout(() => icon.classList.remove("send-animation"), 600);

  // Show typing indicator
  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-indicator";
  typingDiv.id = "typing";
  typingDiv.innerHTML = "<span></span><span></span><span></span>";
  document.getElementById("chat-messages").appendChild(typingDiv);
  document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;

  isBotResponding = true;

  // Send request to backend
  fetch("https://dlc-chat-bot-backend.onrender.com/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      typingDiv.remove();
      appendMessage("bot", data.reply || "🤔 Sorry, I didn't get a reply.");
    })
    .catch(error => {
      typingDiv.remove();
      appendMessage("bot", "❌ Failed to get a response. Please check your internet or try again later.");
      console.error("Fetch error:", error);
    })
    .finally(() => {
      isBotResponding = false;
    });
}

// Handle quick option clicks
document.querySelectorAll(".quick-option").forEach(button => {
  button.addEventListener("click", () => {
    document.getElementById("user-input").value = button.textContent;
    sendMessage();
  });
});

// Welcome message on load
window.addEventListener("DOMContentLoaded", () => {
  appendMessage("bot", "👋 Hi! I'm your DLC Chatbot. Ask me anything about WhatsApp, Paytm, Google Maps or general digital help!");

  // Load dark mode preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.querySelector(".chatbot-container").classList.add("dark");
  }
});

// Dark mode toggle
const toggleBtn = document.getElementById("toggle-dark");
const container = document.querySelector(".chatbot-container");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  container.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Send message on Enter key press
document.getElementById("user-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});
