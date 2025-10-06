/* script-kenangan.js: Logika Menu, Panel, dan Chat di halaman kenangan.html */

// elements
const bgAudio = document.getElementById('bgAudio');

// chat demo messages (edit di sini untuk mengubah isi chat)
const demoChat = [
  {side: 'left', text: 'ini kenangan saat kita pertama kali chatting, kamu ingat?', ts: '10:12'},
  {side: 'right', text: 'hahaha, iya! kamu duluan yang chat aku kan? waktu itu aku malu-malu banget mau bales 😆', ts: '10:15'},
  {side: 'left', text: 'mana ada! aku yang deg-degan nunggu balasan kamu. untung kamu balesnya cepat hehe.', ts: '10:17'},
  {side: 'right', text: 'iya dong, kan aku juga udah nungguin kamu chat. seneng banget deh hari itu! 🥰', ts: '10:20'},
  {side: 'left', text: 'hari yang mengubah segalanya, ciyee.', ts: '10:22'},
  {side: 'right', text: 'love you! 😘', ts: '10:25'}
];

// --- FUNGSI UTAMA ---

window.onload = function() {
    // Jalankan inisialisasi menu dan chat setelah halaman dimuat
    initMenuCards();
    populateChat();
    
    // Coba putar audio setelah interaksi user
    // Karena kita sudah melewati loading screen (interaksi di index.html),
    // browser biasanya lebih mengizinkan autoplay di sini.
    try { bgAudio.play().catch(()=>{}); } catch(e){}
};

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
