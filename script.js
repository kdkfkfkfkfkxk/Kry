document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("كلمة المرور غير متطابقة.");
    return;
  }

  // تسجيل الدخول بدون كابتشا
  sessionStorage.setItem("username", username);
  window.location.href = "chat.html";
});
