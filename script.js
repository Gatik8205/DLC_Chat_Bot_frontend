// Append message to chat
function appendMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  messageDiv.textContent = text;
  document.getElementById("chat-messages").appendChild(messageDiv);
  document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;
}

// Handle send button
function sendMessage() {
  const input = document.getElementById("user-input");
  const userMessage = input.value.trim();
  if (userMessage === "") return;

  console.log("User message:",userMessage);
  
  appendMessage("user", userMessage);

  // Animate paper plane icon
  const icon = document.getElementById("plane-icon");
  icon.classList.add("send-animation");
  setTimeout(() => icon.classList.remove("send-animation"), 600);

  input.value = "";

  // Show typing indicator
  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-indicator";
  typingDiv.id = "typing";
  typingDiv.innerHTML = "<span></span><span></span><span></span>";
  document.getElementById("chat-messages").appendChild(typingDiv);
  document.getElementById("chat-messages").scrollTop = document.getElementById("chat-messages").scrollHeight;

  // Send request to backend (if using AI API)
  fetch("https://dlc-chat-bot-backend.onrender.com/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: 
      userMessage })
  })
    .then(response => response.json())
    .then(data => {
      typingDiv.remove();
      appendMessage("bot", data.reply);
    })
    .catch(error => {
      typingDiv.remove();
      appendMessage("bot", "❌ Failed to get response. Try again.");
      console.error(error);
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
  appendMessage("bot", "👋 Hi! I'm your DLC Chatbot. Ask me anything about WhatsApp, Paytm,Google Maps or any questions you have.");

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

  const mode = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", mode);
});
