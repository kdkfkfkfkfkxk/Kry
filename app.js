
const username = sessionStorage.getItem("username");
if (!username) window.location.href = "index.html";

const chatBox = document.getElementById("chat-box");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

firebase.database().ref("messages").on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const msgElement = document.createElement("div");
  msgElement.textContent = msg.name + ": " + msg.text;
  msgElement.style.margin = "5px 0";
  msgElement.style.color = "#0f0";
  chatBox.insertBefore(msgElement, chatBox.firstChild);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text) {
    firebase.database().ref("messages").push({
      name: username,
      text: text,
    });
    messageInput.value = "";
  }
});
