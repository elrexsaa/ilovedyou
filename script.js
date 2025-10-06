/* script.js: logika verifikasi, typing, menu, chat populate */

/* ===== easy settings (ubah di sini) ===== */
const PASSWORD_TO_CHANGE = 'nikitaelga'; // <-- GANTI PASSWORD DI SINI!
const AUTHOR_HANDLE = '@elgarexsaa';

// elements
const pw = document.getElementById('pw');
const btnEnter = document.getElementById('btnEnter');
const verifyFrame = document.getElementById('verifyFrame');
const verifyIcon = document.getElementById('verifyIcon');
const verifyText = document.getElementById('verifyText');
const loginPage = document.getElementById('loginPage');
const loadingPage = document.getElementById('loadingPage');
const typingText = document.getElementById('typingText');
const memoryPage = document.getElementById('memoryPage');
const bgAudio = document.getElementById('bgAudio');
const contentArea = document.getElementById('contentArea');

// chat demo messages (edit di sini)
const demoChat = [
  {side: 'left', text: 'ini kenangan saat kita pertama kali chatting, kamu ingat?', ts: '10:12'},
  {side: 'right', text: 'hahaha, iya! kamu duluan yang chat aku kan? waktu itu aku malu-malu banget mau bales 😆', ts: '10:15'},
  {side: 'left', text: 'mana ada! aku yang deg-degan nunggu balasan kamu. untung kamu balesnya cepat hehe.', ts: '10:17'},
  {side: 'right', text: 'iya dong, kan aku juga udah nungguin kamu chat. seneng banget deh hari itu! 🥰', ts: '10:20'},
  {side: 'left', text: 'hari yang mengubah segalanya, ciyee.', ts: '10:22'},
  {side: 'right', text: 'love you! 😘', ts: '10:25'}
];

// keyboard submit
pw.addEventListener('keydown', (e) => { if (e.key === 'Enter') attemptEnter(); });
btnEnter.addEventListener('click', attemptEnter);

function showVerify(ok, message) {
  verifyIcon.className = 'verify-icon ' + (ok ? 'ok' : 'fail');
  verifyIcon.textContent = ok ? '✔' : '✖';
  verifyText.textContent = message;
  verifyFrame.hidden = false;
  // auto-hide after a bit (except keep long enough to read)
  setTimeout(() => { verifyFrame.hidden = true; }, 3500);
}

function attemptEnter(){
  const v = (pw.value || '').trim();
  if (v === PASSWORD_TO_CHANGE){
    // Tampilkan notifikasi verifikasi berhasil
    showVerify(true, 'verifikasi berhasil, sedang masuk ke halaman');
    // Beri jeda sebentar agar notifikasi terbaca, lalu mulai sequence loading
    setTimeout(startTypingSequence, 1500); // Jeda 1.5 detik
  } else {
    showVerify(false, `verifikasi gagal, kamu bukan nikita atau elga, hub author website : ${AUTHOR_HANDLE}`);
  }
}

// typing animation
function startTypingSequence(){
  // SEMBUNYIKAN loginPage DULU
  loginPage.hidden = true;
  // Lalu tampilkan loadingPage
  loadingPage.hidden = false;
  typingText.textContent = '';
  const text = 'membuka kenangan...';
  let i = 0;
  const speed = 70; // ms per char
  const t = setInterval(() => {
    typingText.textContent += text.charAt(i) || '';
    i++;
    if (i > text.length){
      clearInterval(t);
      setTimeout(() => {
        // Sembunyikan loadingPage sebelum menampilkan memoryPage
        loadingPage.hidden = true;
        openMemoryPage();
      }, 800);
    }
  }, speed);
}

// open memory page and init menu + audio
function openMemoryPage(){
  memoryPage.hidden = false;
  // try to play background audio (user triggered by clicking verif button)
  setTimeout(() => { bgAudio.play().catch(()=>{}); }, 600);
  initMenuCards();
  populateChat();
}

// menu wiring with fade-in transitions
function initMenuCards(){
  const cards = document.querySelectorAll('.menu-cards .card--menu');
  const panels = document.querySelectorAll('.panel');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.getAttribute('data-target');
      // hide all panels with fade
      panels.forEach(p => hidePanel(p));
      const panelId = target === 'songs' ? 'sectionSongs' :
                      target === 'photos' ? 'sectionPhotos' :
                      target === 'chat' ? 'sectionChat' : null;
      if (!panelId) return;
      const panel = document.getElementById(panelId);
      showPanel(panel);
    });
  });
}

function hidePanel(panel){
  if (!panel) return;
  panel.style.opacity = 1;
  panel.style.transition = 'opacity .35s ease, transform .35s ease';
  panel.style.transform = 'translateY(6px)';
  panel.style.opacity = 0;
  setTimeout(()=> { panel.hidden = true; panel.style.transition = ''; panel.style.transform=''; panel.style.opacity=''; }, 360);
}

function showPanel(panel){
  if (!panel) return;
  panel.hidden = false;
  panel.setAttribute('hidden', 'false'); // Trigger CSS animation

  // focus for accessibility
  panel.setAttribute('tabindex','-1');
  panel.focus();
}

// populate chat preview
function populateChat(){
  const chatBody = document.getElementById('chatBody');
  if (!chatBody) return;
  chatBody.innerHTML = '';
  demoChat.forEach(m => {
    const wrap = document.createElement('div');
    wrap.className = 'bubble ' + (m.side === 'right' ? 'right' : 'left');
    const txt = document.createElement('div'); txt.className = 'txt'; txt.textContent = m.text;
    const ts = document.createElement('div'); ts.className = 'ts'; ts.textContent = m.ts;
    wrap.appendChild(txt); wrap.appendChild(ts);
    chatBody.appendChild(wrap);
  });
}

// small accessibility: ESC to return to login (for quick testing)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    if (!memoryPage.hidden){
      memoryPage.hidden = true;
      loginPage.hidden = false;
      // pause audio
      try { bgAudio.pause(); } catch(e){}
    }
  }
});
