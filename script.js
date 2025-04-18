function generateCaptcha() {
  const canvas = document.getElementById("captchaCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "20px monospace";
  ctx.fillStyle = "#0f0";
  const captcha = Math.random().toString(36).substring(2, 8);
  ctx.fillText(captcha, 10, 25);
  canvas.dataset.captcha = captcha;
}

function validatePassword(password) {
  return /[a-z]/.test(password) &&
         /[A-Z]/.test(password) &&
         /[0-9]/.test(password) &&
         /[^A-Za-z0-9]/.test(password) &&
         password.length >= 6;
}

function register() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const captchaInput = document.getElementById("captchaInput").value.trim();
  const captcha = document.getElementById("captchaCanvas").dataset.captcha;
  const error = document.getElementById("registerError");

  if (!user || !pass || !confirm || !captchaInput) {
    error.textContent = "يرجى تعبئة جميع الحقول";
    return;
  }
  if (pass !== confirm) {
    error.textContent = "كلمتا المرور غير متطابقتين";
    return;
  }
  if (!validatePassword(pass)) {
    error.textContent = "كلمة المرور ضعيفة، يجب أن تحتوي على حروف وأرقام ورموز";
    return;
  }
  if (captchaInput !== captcha) {
    error.textContent = "الكابتشا غير صحيحة";
    generateCaptcha();
    return;
  }

  // success
  document.getElementById("register-container").classList.add("hidden");
  document.getElementById("chat-container").classList.remove("hidden");
  document.getElementById("userDisplay").textContent = user;
  startChat(user);
}

function startChat(username) {
  const messagesDiv = document.getElementById("messages");
  const input = document.getElementById("messageInput");

  db.ref("messages").on("child_added", (snapshot) => {
    const msg = snapshot.val();
    const p = document.createElement("p");
    p.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
    messagesDiv.appendChild(p);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  window.sendMessage = function () {
    const text = input.value.trim();
    if (text) {
      db.ref("messages").push({ user: username, text });
      input.value = "";
    }
  };
}

window.onload = generateCaptcha;
