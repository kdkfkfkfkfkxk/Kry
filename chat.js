import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  remove,
  get,
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// إعدادات Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCKiHADVuRqq1Mse2h2ohDeKLM9_rvmrhY",
  authDomain: "kr0wl-chat.firebaseapp.com",
  databaseURL: "https://kr0wl-chat-default-rtdb.firebaseio.com",
  projectId: "kr0wl-chat",
  storageBucket: "kr0wl-chat.appspot.com",
  messagingSenderId: "941342507383",
  appId: "1:941342507383:web:50d6c755abe6aef1066172"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

const name = sessionStorage.getItem("name");

// زر الخروج
document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.clear();
  location.reload();
});

// إرسال الرسالة عند الضغط على الزر
sendButton.addEventListener("click", sendMessage);

// إرسال الرسالة عند الضغط على Enter
messageInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  const message = {
    name: name || "مجهول",
    text: text,
    time: Date.now(),
  };

  push(messagesRef, message);
  messageInput.value = "";
}

// عرض الرسائل عند إضافتها
onChildAdded(messagesRef, (data) => {
  const msg = data.val();
  const msgElement = document.createElement("div");
  msgElement.innerHTML = `<span style="color:${getColor(msg.name)};">${msg.name}</span>: ${msg.text}`;
  chat.appendChild(msgElement);
  chat.scrollTop = chat.scrollHeight;
});

// تلوين الأسماء
function getColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 100%, 70%)`;
  return color;
}
