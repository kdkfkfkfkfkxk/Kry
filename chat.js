function initChat() {
    const username = sessionStorage.getItem("username");
    if (!username) {
        window.location.href = "index.html";
    }

    const msgBox = document.getElementById("messages");
    msgBox.innerHTML += "<p><b>النظام:</b> مرحبًا " + username + " في غرفة الدردشة.</p>";
}

function sendMessage() {
    const input = document.getElementById("messageInput");
    const msgBox = document.getElementById("messages");
    const message = input.value.trim();
    const username = sessionStorage.getItem("username");

    if (message) {
        msgBox.innerHTML += `<p><b>${username}:</b> ${message}</p>`;
        input.value = "";
        msgBox.scrollTop = msgBox.scrollHeight;
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = "index.html";
}

window.onpopstate = function () {
    logout();
};