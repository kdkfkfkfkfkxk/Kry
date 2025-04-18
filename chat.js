const username = sessionStorage.getItem("username");
if (!username) window.location.href = "index.html";

// بيانات supabase
const supabaseUrl = "https://your-project.supabase.co";
const supabaseKey = "your-anon-key";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// إرسال الرسالة
async function sendMessage() {
  const content = document.getElementById("messageInput").value.trim();
  if (!content) return;

  await supabase.from("messages").insert([{ user: username, content }]);
  document.getElementById("messageInput").value = "";
}

// عرض الرسائل
async function loadMessages() {
  const { data } = await supabase.from("messages").select("*").order("id", { ascending: true });
  const messagesDiv = document.getElementById("messages");
  messagesDiv.innerHTML = "";

  data.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.className = "message";
    msgDiv.innerHTML = `<strong style="color: ${colorFromName(msg.user)}">${msg.user}:</strong> ${msg.content}`;
    messagesDiv.appendChild(msgDiv);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ألوان حسب الاسم
function colorFromName(name) {
  const colors = ["#00ffcc", "#ff00ff", "#00ffff", "#ffcc00", "#ff6666"];
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return colors[sum % colors.length];
}

// استماع مباشر للرسائل
supabase
  .channel('public:messages')
  .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, loadMessages)
  .subscribe();

// زر الخروج
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

// أول تحميل
loadMessages();