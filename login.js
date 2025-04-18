function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
    const error = document.getElementById("error");

    if (!username || !password || !confirm) {
        error.textContent = "الرجاء ملء جميع الحقول.";
        return;
    }

    if (password !== confirm) {
        error.textContent = "كلمتا المرور غير متطابقتين.";
        return;
    }

    sessionStorage.setItem("username", username);
    window.location.href = "chat.html";
}