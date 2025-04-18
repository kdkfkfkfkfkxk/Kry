const firebaseConfig = {
  apiKey: "AIzaSyD3...",
  authDomain: "kr0wl-chat.firebaseapp.com",
  projectId: "kr0wl-chat",
  storageBucket: "kr0wl-chat.appspot.com",
  messagingSenderId: "777946132758",
  appId: "1:777946132758:web:xxxxxx"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let username = "مستخدم_" + Math.floor(Math.random() * 1000);
const colors = {};

function getRandomColor() {
  const colorList = ["#f94144", "#f3722c", "#f8961e", "#90be6d", "#43aa8b", "#577590", "#f72585"];
  return colorList[Math.floor(Math.random() * colorList.length)];
}

function sendMessage() {
  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (text !== "") {
    db.collection("messages").add({
      user: username,
      text: text,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    input.value = "";
  }
}

function listenMessages() {
  db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
    const msgContainer = document.getElementById("messages");
    msgContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.className = "msg";
      const color = colors[data.user] || (colors[data.user] = getRandomColor());
      div.innerHTML = `<b style="color:${color}">${data.user}:</b> ${data.text}`;
      msgContainer.appendChild(div);
    });
    msgContainer.scrollTop = msgContainer.scrollHeight;
  });
}

listenMessages();
