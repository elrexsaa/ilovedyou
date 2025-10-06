/* script.js: Logika Verifikasi Halaman Login (index.html) */

/* ===== easy settings (ubah di sini) ===== */
const PASSWORD_TO_CHANGE = 'nikitaelga'; // <-- GANTI PASSWORD DI SINI!
const AUTHOR_HANDLE = '@elgarexsaa';
const TARGET_PAGE = 'kenangan.html'; // Target halaman setelah login

// elements
const pw = document.getElementById('pw');
const btnEnter = document.getElementById('btnEnter');
const verifyFrame = document.getElementById('verifyFrame');
const verifyIcon = document.getElementById('verifyIcon');
const verifyText = document.getElementById('verifyText');
const loginPage = document.getElementById('loginPage');
const loadingPage = document.getElementById('loadingPage');
const typingText = document.getElementById('typingText');

// event listeners
pw.addEventListener('keydown', (e) => { if (e.key === 'Enter') attemptEnter(); });
btnEnter.addEventListener('click', attemptEnter);

function showVerify(ok, message) {
  verifyIcon.className = 'verify-icon ' + (ok ? 'ok' : 'fail');
  verifyIcon.textContent = ok ? '✔' : '✖';
  verifyText.textContent = message;
  verifyFrame.hidden = false;
  setTimeout(() => { verifyFrame.hidden = true; }, 3500);
}

function attemptEnter(){
  const v = (pw.value || '').trim();
  if (v === PASSWORD_TO_CHANGE){
    showVerify(true, 'verifikasi berhasil, sedang masuk ke halaman');
    setTimeout(startTypingSequence, 1500); // Jeda 1.5 detik sebelum loading
  } else {
    showVerify(false, `verifikasi gagal, hub author: ${AUTHOR_HANDLE}`);
  }
}

function startTypingSequence(){
  loginPage.hidden = true; // Sembunyikan halaman login
  loadingPage.hidden = false; // Tampilkan loading overlay

  typingText.textContent = '';
  const text = 'membuka kenangan...';
  let i = 0;
  const speed = 70;

  const t = setInterval(() => {
    typingText.textContent += text.charAt(i) || '';
    i++;
    if (i > text.length){
      clearInterval(t);
      // PENTING: Arahkan ke halaman kenangan.html setelah loading
      setTimeout(() => {
        window.location.href = TARGET_PAGE;
      }, 800);
    }
  }, speed);
}
