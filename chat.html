let username = "";
const colors = {};

function register() {
  const name = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!name || !pass) return alert("اكتب اسمك وكلمة السر");
  if (pass !== "kr0wldz21") return alert("كلمة المرور غير صحيحة");

  username = name;
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("chat-container").classList.remove("hidden");
  document.getElementById("user-name").innerText = "مرحباً، " + username;

  listenMessages();
}

function sendMessage() {
  const text = document.getElementById("message-input").value.trim();
  if (!text) return;

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
      const msgContainer = document.getElementById("messages");
      msgContainer.innerHTML = "";

      snapshot.forEach(doc => {
        const data = doc.data();
        const color = colors[data.user] || (colors[data.user] = getRandomColor());
        const div = document.createElement("div");
        div.style.color = color;
        div.innerHTML = `<b>${data.user}:</b> ${data.text}`;
        msgContainer.appendChild(div);
      });

      msgContainer.scrollTop = msgContainer.scrollHeight;
    });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
