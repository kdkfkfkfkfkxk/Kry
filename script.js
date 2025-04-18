function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  window.captchaAnswer = num1 + num2;
  document.getElementById("captchaQuestion").innerText = `ما ناتج ${num1} + ${num2} ؟`;
}

function register() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;
  const captcha = document.getElementById("captchaInput").value;

  if (!user || !pass || !confirm || !captcha) {
    alert("الرجاء ملء جميع الحقول");
    return;
  }

  if (pass !== confirm) {
    alert("كلمتا المرور غير متطابقتين");
    return;
  }

  if (parseInt(captcha) !== window.captchaAnswer) {
    alert("إجابة الكابتشا خاطئة");
    generateCaptcha();
    return;
  }

  alert("تم الدخول بنجاح (يمكنك الآن تحويله للدردشة)");
  // هنا يمكن تحويل المستخدم لصفحة المحادثة
}

window.onload = () => {
  generateCaptcha();
  typeWriterEffect();
};

function typeWriterEffect() {
  const title = document.getElementById("title");
  const text = "Kr0wl Chat";
  let i = 0;

  function write() {
    if (i < text.length) {
      title.textContent += text.charAt(i);
      i++;
      setTimeout(write, 150);
    } else {
      setTimeout(() => {
        title.textContent = "";
        i = 0;
        write();
      }, 2000);
    }
  }

  write();
}
