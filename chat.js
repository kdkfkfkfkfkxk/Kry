// إعداد Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase, ref, push, onValue
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKiHADVuRqq1Mse2h2ohDeKLM9_rvmrhY",
  authDomain: "kr0wl-chat.firebaseapp.com",
  databaseURL: "https://kr0wl-chat-default-rtdb.firebaseio.com",
  projectId: "kr0wl-chat",
  storageBucket: "kr0wl-chat.appspot.com",
  messagingSenderId: "941342507383",
  appId: "1:941342507383:web:50d6c755abe6aef1066172",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const chatRef = ref(db, "darkchat");

const nickname = sessionStorage.getItem("nickname");
if (!nickname) location.href = "index.html";

document.getElementById("nickname-display").textContent = "مرحباً، " + nickname;

// مفتاح تشفير
const secretKey = "kr0wlSecret";

// إرسال الرسالة عند الضغط على Enter
document.getElementById("message").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// إرسال الرسالة
function sendMessage() {
  const input = document.getElementById("message");
  const raw = input.value.trim();
  if (!raw) return;

  const encrypted = CryptoJS.AES.encrypt(raw, secretKey).toString();

  push(chatRef, {
    user: nickname,
    text: encrypted,
    time: Date.now()
  });

  input.value = "";
}

// الاستماع للرسائل الجديدة
onValue(chatRef, (snapshot) => {
  const msgBox = document.getElementById("messages");
  msgBox.innerHTML = "";

  const data = snapshot.val();
  if (data) {
    const sorted = Object.values(data).sort((a, b) => a.time - b.time);
    sorted.forEach((msg) => {
      try {
        const decrypted = CryptoJS.AES.decrypt(msg.text, secretKey).toString(CryptoJS.enc.Utf8);
        const div = document.createElement("div");
        div.innerHTML = `<b style="color:lime">${msg.user}:</b> ${decrypted}`;
        msgBox.appendChild(div);
      } catch (err) {
        console.warn("رسالة غير قابلة للفك");
      }
    });
    msgBox.scrollTop = msgBox.scrollHeight;
  }
});

// الخروج من المحادثة
function logout() {
  sessionStorage.clear();
  location.href = "index.html";
}

// ربط الدوال بالأزرار
window.sendMessage = sendMessage;
window.logout = logout;
