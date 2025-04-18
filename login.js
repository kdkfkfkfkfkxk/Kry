
function login() {
  const name = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;

  if (name === "" || pass === "") {
    document.getElementById("error").innerText = "الرجاء إدخال الاسم وكلمة المرور";
    return;
  }

  if (pass === "kr0wldz21") {
    sessionStorage.setItem("name", name);
    location.href = "chat.html";
  } else {
    document.getElementById("error").innerText = "كلمة المرور غير صحيحة!";
  }
}
