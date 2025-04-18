// توليد الكابتشا الحسابي
let a = Math.floor(Math.random() * 10) + 1;
let b = Math.floor(Math.random() * 10) + 1;
document.getElementById("question").innerText = `${a} + ${b} = ?`;

function validate() {
  let name = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let confirm = document.getElementById("confirm").value;
  let answer = document.getElementById("captcha").value;
  let error = document.getElementById("error");

  if (!name || !pass || !confirm || !answer) {
    error.innerText = "يرجى ملء جميع الحقول.";
    return;
  }

  if (pass !== confirm) {
    error.innerText = "كلمتا المرور غير متطابقتين.";
    return;
  }

  if (parseInt(answer) !== a + b) {
    error.innerText = "إجابة الكابتشا غير صحيحة.";
    return;
  }

  // حفظ الاسم مؤقتًا
  sessionStorage.setItem("username", name);
  window.location.href = "chat.html";
}

// تأثير الكتابة للعنوان
const title = "مرحبًا بك في Kr0wl Chat";
let i = 0;
function type() {
  document.getElementById("typing-title").innerText = title.substring(0, i++);
  if (i <= title.length) setTimeout(type, 100);
  else i = 0;
}
type();