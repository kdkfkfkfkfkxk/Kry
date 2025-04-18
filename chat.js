const firebaseConfig = {
  apiKey: "AIzaSyCKiHADVuRqq1Mse2h2ohDeKLM9_rvmrhY",
  authDomain: "kr0wl-chat.firebaseapp.com",
  projectId: "kr0wl-chat",
  storageBucket: "kr0wl-chat.firebasestorage.app",
  messagingSenderId: "941342507383",
  appId: "1:941342507383:web:50d6c755abe6aef1066172",
  measurementId: "G-WZ8NME39V7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let username = "";
const passwordKey = "kr0wldz21";
const colors = {};

function register() {
  const name = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  if (!name || !pass) return alert("أدخل اسم وكلمة سر");
  if (pass !== passwordKey) return alert("كلمة السر خاطئة");

  username = name;
  document.getElementById("login-container").classList.add("hidden");
  document.getElementById("chat-container").classList.remove("hidden");
  document.getElementById("user-name").innerText = "مرحبًا، " + username;
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
  db.collection("messages").orderBy("timestamp")
    .onSnapshot(snapshot => {
      document.getElementById("messages").innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const color = colors[data.user] || (colors[data.user] = getRandomColor());
        const div = document.createElement("div");
        div.innerHTML = `<span class="username" style="color:${color}">${data.user}:</span> ${data.text}`;
        document.getElementById("messages").appendChild(div);
      });
      document.getElementById("messages").scrollTop = 999999;
    });
}

function logout() {
  location.reload();
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  return '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('');
}
