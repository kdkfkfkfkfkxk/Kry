function enterChat() {
  const name = document.getElementById("nickname").value.trim();
  const code = document.getElementById("secret-code").value.trim();
  const error = document.getElementById("error");

  if (!name || !code) {
    error.textContent = "يرجى إدخال الاسم والكود.";
    return;
  }

  // كود الدخول السري الصحيح
  const correctCode = "kr0wl2024";

  if (code !== correctCode) {
    error.textContent = "الكود السري غير صحيح.";
    return;
  }

  // حفظ الاسم مؤقتاً في session
  sessionStorage.setItem("nickname", name);

  // التوجه للمحادثة
  window.location.href = "chat.html";
}