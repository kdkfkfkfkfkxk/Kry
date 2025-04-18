// توليد الكابتشا
function generateCaptcha() {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  const result = a + b;
  document.getElementById("captcha-question").innerText = `${a} + ${b} = ؟`;
  return result;
}

let correctAnswer = generateCaptcha();

function login() {
  const name = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const captcha = document.getElementById("captcha-answer").value;
  const errorEl = document.getElementById("error");

  // تحقق من الحقول
  if (!name || !password || !confirm || !captcha) {
    errorEl.innerText = "الرجاء تعبئة جميع الحقول";
    return;
  }

  // تحقق من تطابق كلمتي المرور
  if (password !== confirm) {
    errorEl.innerText = "كلمتا المرور غير متطابقتين";
    return;
  }

  // تحقق من الكابتشا
  if (parseInt(captcha) !== correctAnswer) {
    errorEl.innerText = "إجابة الكابتشا غير صحيحة";
    correctAnswer = generateCaptcha(); // توليد كابتشا جديدة
    return;
  }

  // تخزين الاسم في الجلسة والدخول
  sessionStorage.setItem("name", name);
  window.location.href = "chat.html";
}
