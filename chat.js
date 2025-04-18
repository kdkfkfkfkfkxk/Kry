// إعداد Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCKiHADVuRqq1Mse2h2ohDeKLM9_rvmrhY",
    authDomain: "kr0wl-chat.firebaseapp.com",
    projectId: "kr0wl-chat",
    storageBucket: "kr0wl-chat.appspot.com",
    messagingSenderId: "941342507383",
    appId: "1:941342507383:web:50d6c755abe6aef1066172",
    measurementId: "G-WZ8NME39V7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function initChat() {
    const username = sessionStorage.getItem("username");
    if (!username) {
        window.location.href = "index.html";
        return;
    }

    const msgBox = document.getElementById("messages");
    msgBox.innerHTML += `<p><b>النظام:</b> مرحبًا ${username} في غرفة الدردشة.</p>`;

    // عرض الرسائل من Firebase
    db.collection("messages")
        .orderBy("timestamp")
        .onSnapshot(snapshot => {
            msgBox.innerHTML = "";
            snapshot.forEach(doc => {
                const data = doc.data();
                msgBox.innerHTML += `<p><b>${data.username}:</b> ${data.text}</p>`;
            });
            msgBox.scrollTop = msgBox.scrollHeight;
        });
}

function sendMessage() {
    const input = document.getElementById("messageInput");
    const message = input.value.trim();
    const username = sessionStorage.getItem("username");

    if (message !== "") {
        db.collection("messages").add({
            username: username,
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        input.value = "";
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

// تسجيل الخروج عند الضغط على زر الرجوع
window.onpopstate = function () {
    logout();
};
