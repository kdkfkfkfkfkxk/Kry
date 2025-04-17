let username = "";
const colors = {};

function register() {
  const name = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const answer = document.getElementById("captcha-answer").value;

  if (!name || !pass || !confirm || !answer) return alert("املأ كل الخانات");
  if (pass !== confirm) return alert("كلمتا السر غير متطابقتين");
  if (parseInt(answer) !== parseInt(window.captchaResult)) return alert("كابتشا خاطئة");

  username = name;
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("chat-container").classList.remove("hidden");
  document.getElementById("user-name").innerText = "أهلاً، " + username;

  listenMessages();
}

function sendMessage() {
  const text = document.getElementById("message-input").value;
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
      document.getElementById("messages").innerHTML = "";
      snapshot.docs.forEach(doc => {
        const data = doc.data();
        const color = colors[data.user] || (colors[data.user] = getRandomColor());
        const time = data.timestamp?.toDate();
        const now = new Date();
        if (time && (now - time) > 86400000) {
          doc.ref.delete(); // حذف الرسائل بعد 24 ساعة
          return;
        }

        const div = document.createElement("div");
        div.innerHTML = `<span class="username" style="color:${color}">${data.user}:</span> ${data.text}`;
        document.getElementById("messages").appendChild(div);
      });
      document.getElementById("messages").scrollTop = 999999;
    });
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10), b = Math.floor(Math.random() * 10);
  document.getElementById("captcha-question").innerText = `${a} + ${b} = ؟`;
  window.captchaResult = a + b;
}
generateCaptcha();