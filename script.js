const PASSWORD = "nikitaelga"; // ubah ini kalo mau ganti password

function verifyPassword() {
  const input = document.getElementById("password").value;
  const frame = document.getElementById("verify-frame");
  const icon = document.getElementById("verify-icon");
  const text = document.getElementById("verify-text");

  frame.classList.remove("hidden");
  if (input === PASSWORD) {
    icon.innerHTML = "✅";
    text.innerText = "verifikasi berhasil, sedang masuk ke halaman...";
    setTimeout(() => showLoading(), 2000);
  } else {
    icon.innerHTML = "❌";
    text.innerText = "verifikasi gagal, kamu bukan nikita atau elga, hub author website : @elgarexsaa";
  }
}

function showLoading() {
  document.getElementById("login-page").classList.remove("active");
  document.getElementById("loading-page").classList.add("active");
  let text = "membuka kenangan...";
  let i = 0;
  const el = document.getElementById("loading-text");
  const typing = setInterval(() => {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      setTimeout(() => showMenu(), 1000);
    }
  }, 100);
}

function showMenu() {
  document.getElementById("loading-page").classList.remove("active");
  document.getElementById("menu-page").classList.add("active");
  document.getElementById("backsound").play();
}

function showSection(section) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(`section-${section}`).classList.remove("hidden");
}
