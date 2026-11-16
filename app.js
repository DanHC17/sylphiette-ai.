const STORAGE = {
  messages: "sylphiette.messages.v1",
  memories: "sylphiette.memories.v1"
};

const chat = document.querySelector("#chat");
const composer = document.querySelector("#composer");
const input = document.querySelector("#messageInput");
const dialog = document.querySelector("#memoryDialog");
const memoryList = document.querySelector("#memoryList");

function readStore(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}
function saveStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
let messages = readStore(STORAGE.messages, []);
let memories = readStore(STORAGE.memories, []);

function addMessage(role, content, persist = true) {
  const item = { role, content, at: new Date().toISOString() };
  const article = document.createElement("article");
  article.className = `message ${role}`;
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = content;
  const time = document.createElement("time");
  time.textContent = new Date(item.at).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  article.append(bubble, time);
  chat.append(article);
  chat.scrollTop = chat.scrollHeight;
  if (persist) {
    messages.push(item);
    messages = messages.slice(-150);
    saveStore(STORAGE.messages, messages);
  }
}

function renderHistory() {
  chat.replaceChildren();
  if (!messages.length) {
    addMessage("assistant", "¡Hola! Me alegra que estés aquí. Podemos empezar poco a poco. ¿Cómo ha ido tu día?", false);
    return;
  }
  for (const item of messages) addMessage(item.role, item.content, false);
}

function demoReply(text) {
  const lower = text.toLowerCase();
  if (/(hola|buenas|hey|holi)/.test(lower)) {
    return "¡Hola! Qué alegría leerte. ¿Cómo te encuentras hoy?";
  }
  if (/(triste|mal día|me siento mal|solo|solitario|cansado)/.test(lower)) {
    return "Oh... lamento que estés pasando por eso. Si quieres, puedes contarme qué ocurrió. Te escucharé con calma.";
  }
  if (/(gracias|te agradezco)/.test(lower)) {
    return "No tienes que agradecerme. Me alegra poder acompañarte un ratito.";
  }
  if (/(recuerdas|qué sabes de mí|que sabes de mi)/.test(lower)) {
    if (memories.length) {
      return "Puedo consultar los recuerdos que guardaste en este dispositivo:\n" +
        memories.map((m, i) => `${i + 1}. ${m}`).join("\n");
    }
    return "Todavía no tengo recuerdos guardados. Puedes agregar algunos desde el botón de recuerdos, arriba a la derecha.";
  }
  if (/(quién eres|quien eres|tu nombre)/.test(lower)) {
    return "Soy Sylphiette. Esta es mi primera versión de prueba, así que todavía estoy aprendiendo a conversar contigo.";
  }
  return "Mmm... quiero entenderte bien. Esta versión todavía funciona con respuestas de demostración, no con una IA conectada. Puedes contarme más y también guardar recuerdos desde el botón de arriba.";
}

composer.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  addMessage("user", text);
  input.value = "";
  input.style.height = "auto";
  window.setTimeout(() => addMessage("assistant", demoReply(text)), 350);
});

input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
});

document.querySelector("#memoryButton").addEventListener("click", () => {
  renderMemories();
  dialog.showModal();
});

function renderMemories() {
  memoryList.replaceChildren();
  if (!memories.length) {
    const empty = document.createElement("p");
    empty.textContent = "Aún no hay recuerdos guardados.";
    empty.className = "empty";
    memoryList.append(empty);
    return;
  }
  memories.forEach((memory, index) => {
    const row = document.createElement("div");
    row.className = "memory-item";
    const text = document.createElement("span");
    text.textContent = memory;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "×";
    remove.setAttribute("aria-label", "Eliminar recuerdo");
    remove.addEventListener("click", () => {
      memories.splice(index, 1);
      saveStore(STORAGE.memories, memories);
      renderMemories();
    });
    row.append(text, remove);
    memoryList.append(row);
  });
}

document.querySelector("#memoryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const field = document.querySelector("#memoryInput");
  const value = field.value.trim();
  if (!value) return;
  memories.push(value);
  saveStore(STORAGE.memories, memories);
  field.value = "";
  renderMemories();
});

document.querySelector("#clearDataButton").addEventListener("click", () => {
  if (!confirm("¿Seguro que quieres borrar todas las conversaciones y recuerdos guardados en este dispositivo?")) return;
  messages = [];
  memories = [];
  localStorage.removeItem(STORAGE.messages);
  localStorage.removeItem(STORAGE.memories);
  renderMemories();
  renderHistory();
});

renderHistory();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("No se pudo registrar el modo sin conexión:", error);
    });
  });
}
