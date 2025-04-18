const firebaseConfig = {
  apiKey: "AIzaSyCKiHADVuRqq1Mse2h2ohDeKLM9_rvmrhY",
  authDomain: "kr0wl-chat.firebaseapp.com",
  databaseURL: "https://kr0wl-chat-default-rtdb.firebaseio.com",
  projectId: "kr0wl-chat",
  storageBucket: "kr0wl-chat.appspot.com",
  messagingSenderId: "941342507383",
  appId: "1:941342507383:web:50d6c755abe6aef1066172",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const loginScreen = document.getElementById("login-screen");
const chatScreen = document.getElementById("chat-screen");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const messageInput = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");
const userLabel = document.getElementById("user-label");
const errorBox = document.getElementById("error");

let currentUser = "";

function login() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();
  const confirm = confirmInput.value.trim();

  if (!username || !password || !confirm) {
    errorBox.textContent = "يرجى ملء جميع الحقول.";
    return;
  }

  if (password !== confirm) {
    errorBox.textContent = "كلمتا المرور غير متطابقتين.";
    return;
  }

  if (password.length < 6) {
    errorBox.textContent = "كلمة السر ضعيفة جداً.";
    return;
  }

  currentUser = username;
  userLabel.textContent = "مرحباً، " + username;
  loginScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
  listenMessages();
}

function logout() {
  location.reload();
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const msg = {
    user: currentUser,
    text: text,
    time: Date.now()
  };
  db.ref("messages").push(msg);
  messageInput.value = "";
}

function listenMessages() {
  db.ref("messages").on("value", (snapshot) => {
    messagesDiv.innerHTML = "";
    const data = snapshot.val();
    if (data) {
      const sorted = Object.values(data).sort((a, b) => a.time - b.time);
      sorted.forEach((msg) => {
        const div = document.createElement("div");
        div.textContent = msg.user + ": " + msg.text;
        messagesDiv.appendChild(div);
      });
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  });
}

window.onbeforeunload = logout;
