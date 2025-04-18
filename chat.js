let username = "";
const colors = {};

function register() {
  const name = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (!name || !pass) return alert("املأ كل الخانات");
  if (pass !== "kr0wldz21") return alert("كلمة المرور غير صحيحة");

  username = name;
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("chat-container").classList.remove("hidden");
  document.getElementById("user-name").innerText = "أهلاً، " + username;

  listenMessages();
}

function sendMessage() {
  const text = document.getElementById("message-input").value;
  if (!text.trim()) return;
  db.collection("messages").add({
    user: username,
    text: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  document.getElementById("message-input").value = "";
}

function listenMessages() {
  db.collection("messages")
    .orderBy("timestamp")
    .onSnapshot(snapshot => {
      const container = document.getElementById("messages");
      container.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        if (!data.timestamp) return;

        const color = colors[data.user] || (colors[data.user] = getRandomColor());

        const div = document.createElement("div");
        div.innerHTML = `<span class="username" style="color:${color}">${data.user}:</span> ${data.text}`;
        container.appendChild(div);
      });
      container.scrollTop = container.scrollHeight;
    });
}

function logout() {
  username = "";
  document.getElementById("login-container").classList.remove("hidden");
  document.getElementById("chat-container").classList.add("hidden");
  document.getElementById("messages").innerHTML = "";
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}
