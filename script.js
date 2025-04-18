const firebaseConfig = {
  apiKey: "AIzaSyCKiHADVuRqq1Mse2h2ohDeKLM9_rvmrhY",
  authDomain: "kr0wl-chat.firebaseapp.com",
  databaseURL: "https://kr0wl-chat-default-rtdb.firebaseio.com",
  projectId: "kr0wl-chat",
  storageBucket: "kr0wl-chat.appspot.com",
  messagingSenderId: "941342507383",
  appId: "1:941342507383:web:50d6c755abe6aef1066172"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentUser = null;

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) return alert("الرجاء تعبئة جميع الحقول");
  
  // هنا كلمة السر الثابتة
  if (password !== "kr0wldz21") return alert("كلمة السر خاطئة");

  currentUser = username;
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("chat-screen").style.display = "block";
  document.getElementById("welcome").textContent = `مرحبًا ${username}`;
  listenMessages();
}

function logout() {
  location.reload();
}

function sendMessage() {
  const msgInput = document.getElementById("message-input");
  const text = msgInput.value.trim();
  if (!text) return;
  
  db.ref("messages").push({
    user: currentUser,
    text: text,
    time: Date.now()
  });
  msgInput.value = "";
}

function listenMessages() {
  const messagesDiv = document.getElementById("messages");
  db.ref("messages").on("value", snapshot => {
    messagesDiv.innerHTML = "";
    snapshot.forEach(msg => {
      const data = msg.val();
      const p = document.createElement("p");
      p.innerHTML = `<strong>${data.user}:</strong> ${data.text}`;
      messagesDiv.appendChild(p);
    });
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });
}

// تسجيل الخروج عند الضغط على زر الرجوع في الهاتف
window.onpopstate = logout;
