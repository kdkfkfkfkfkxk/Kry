import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://ikqzdttdefzdleuizutnz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrcXpkdGRlZnpkbGV1aXp1dG56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5Nzg1NzgsImV4cCI6MjA2MDU1NDU3OH0.3w38C2IvtJBpxmogW6X_FLNjG27rQKImET7ILIf-Z-w";
const supabase = createClient(supabaseUrl, supabaseKey);

const username = sessionStorage.getItem("name");
if (!username) {
  location.href = "index.html";
}

const chat = document.getElementById("chat");
const messageInput = document.getElementById("message");
const sendButton = document.getElementById("send");

// إرسال الرسالة
async function sendMessage() {
  const text = messageInput.value.trim();
  if (text === "") return;

  const { error } = await supabase.from("Kr0wl").insert([
    { user: username, text: text }
  ]);

  if (!error) {
    messageInput.value = "";
  }
}

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// جلب الرسائل وعرضها
async function loadMessages() {
  const { data, error } = await supabase
    .from("Kr0wl")
    .select("*")
    .order("id", { ascending: true });

  if (!error && data) {
    data.forEach(msg => {
      addMessage(msg.user, msg.text);
    });
  }
}

loadMessages();

// الاشتراك في التحديثات
supabase
  .channel("chat-room")
  .on("postgres_changes", { event: "INSERT", schema: "public", table: "Kr0wl" }, (payload) => {
    const msg = payload.new;
    addMessage(msg.user, msg.text);
  })
  .subscribe();

// عرض الرسالة
function addMessage(user, text) {
  const msgElement = document.createElement("div");
  msgElement.textContent = `${user}: ${text}`;
  msgElement.style.color = getColorForName(user);
  chat.appendChild(msgElement);
  chat.scrollTop = chat.scrollHeight;
}

function getColorForName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 100%, 70%)`;
}

document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.clear();
  location.href = "index.html";
});
