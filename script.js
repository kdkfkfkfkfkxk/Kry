function register() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (!user || !pass || !confirm) {
    alert("يرجى ملء جميع الحقول");
    return;
  }

  if (pass !== confirm) {
    alert("كلمتا المرور غير متطابقتين");
    return;
  }

  alert("تم الدخول بنجاح (جهّز صفحة الدردشة التالية هنا)");
  // هنا يمكن توجيه المستخدم لصفحة الدردشة، مثال:
  // window.location.href = "chat.html";
}

window.onload = () => {
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
