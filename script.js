let firstNumber, secondNumber;

function generateCaptcha() {
  firstNumber = Math.floor(Math.random() * 10) + 1;
  secondNumber = Math.floor(Math.random() * 10) + 1;
  document.getElementById('captcha').innerText = `كم ناتج ${firstNumber} + ${secondNumber} ؟`;
}

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const captchaInput = document.getElementById("captchaInput").value;
  const error = document.getElementById("error");

  // تحقق من الحقول
  if (!username || !password || !confirmPassword || !captchaInput) {
    error.textContent = "يرجى ملء جميع الحقول.";
    return;
  }

  // تحقق من كلمة المرور
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  if (!strongPassword.test(password)) {
    error.textContent = "كلمة المرور ضعيفة. يجب أن تحتوي على حروف صغيرة وكبيرة وأرقام ورموز.";
    return;
  }

  if (password !== confirmPassword) {
    error.textContent = "كلمتا المرور غير متطابقتين.";
    return;
  }

  // تحقق من الكابتشا
  if (parseInt(captchaInput) !== (firstNumber + secondNumber)) {
    error.textContent = "إجابة الكابتشا غير صحيحة.";
    generateCaptcha(); // إعادة توليد الكابتشا
    return;
  }

  // إذا مر كل شيء
  alert(`مرحباً ${username}! تم تسجيل الدخول بنجاح.`);
  error.textContent = "";
}

generateCaptcha(); // توليد أول كابتشا عند التشغيل
