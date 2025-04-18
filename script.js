const username = localStorage.getItem("username");
if (!username) {
  window.location.href = "index.html";
}

const db = firebase.database();

function sendMessage() {
  const msg = document.getElementById("messageInput").value;
  if (msg.trim() === "") return;

  db.ref("messages").push({
    name: username,
    message: msg,
    timestamp: Date.now()
  });

  document.getElementById("messageInput").value = "";
}

db.ref("messages").on("child_added", (snapshot) => {
  const data = snapshot.val();
  const msgDiv = document.getElementById("messages");

  const msg = document.createElement("div");
  msg.textContent = `${data.name}: ${data.message}`;
  msg.style.color = "lime";

  msgDiv.appendChild(msg);
  msgDiv.scrollTop = msgDiv.scrollHeight;
});

function logout() {
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
