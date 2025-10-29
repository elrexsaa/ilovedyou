document.addEventListener("DOMContentLoaded", async () => {
  const chatBody = document.getElementById("chatBody");

  async function loadChat() {
    try {
      const res = await fetch("data/chat.txt");
      const text = await res.text();
      const lines = text.trim().split("\n");

      chatBody.innerHTML = "";

      lines.forEach((line) => {
        const match = line.match(/\[(\d{2}:\d{2})\]\s(.*?)\:\s(.*)/);
        if (!match) return;

        const [, time, sender, message] = match;
        const side = sender.toLowerCase().includes("kamu") ? "right" : "left";
        const bubble = document.createElement("div");
        bubble.classList.add("chat-bubble", side);

        const textDiv = document.createElement("div");
        textDiv.classList.add("text");

        // deteksi isi pesan
        if (message.includes("🖼")) {
          const imgPath = message.replace("🖼", "").trim();
          const img = document.createElement("img");
          img.src = imgPath;
          img.alt = "media";
          img.classList.add("chat-image");
          textDiv.appendChild(img);
        } else if (message.includes("🕳")) {
          textDiv.textContent = "pesan ini telah dihapus";
          textDiv.classList.add("deleted");
        } else {
          textDiv.textContent = message;
        }

        const metaDiv = document.createElement("div");
        metaDiv.classList.add("meta");

        const timeSpan = document.createElement("span");
        timeSpan.classList.add("timestamp");
        timeSpan.textContent = time;

        const checkSpan = document.createElement("span");
        checkSpan.classList.add("checkmark");
        checkSpan.innerHTML = '<i class="fas fa-check-double"></i>';

        metaDiv.appendChild(timeSpan);
        if (side === "right") metaDiv.appendChild(checkSpan);

        bubble.appendChild(textDiv);
        bubble.appendChild(metaDiv);
        chatBody.appendChild(bubble);
      });

      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    } catch (err) {
      chatBody.innerHTML = "<p style='color:gray;text-align:center;'>gagal memuat chat :(</p>";
    }
  }

  loadChat();
});
