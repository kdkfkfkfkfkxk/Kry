
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
    document.getElementById("user-name").innerText = "أهلاً، " + username;
    listenMessages();
}

function logout() {
    username = "";
    document.getElementById("chat-container").classList.add("hidden");
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
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
    db.collection("messages").orderBy("timestamp").onSnapshot(snapshot => {
        const msgContainer = document.getElementById("messages");
        msgContainer.innerHTML = "";
        snapshot.forEach(doc => {
            const data = doc.data();
            const color = colors[data.user] || (colors[data.user] = getRandomColor());
            const div = document.createElement("div");
            div.innerHTML = `<span style="color:${color}; font-weight:bold">${data.user}:</span> ${data.text}`;
            msgContainer.appendChild(div);
        });
    });
}

function getRandomColor() {
    const colorList = ["#f94144", "#f3722c", "#f8961e", "#90be6d", "#43aa8b", "#577590"];
    return colorList[Math.floor(Math.random() * colorList.length)];
}
