// --- MULAI COPY PASTE SELURUHNYA KE FILE script.js ---

// ===== COUNTDOWN =====
const TARGET_DATE = '2025-11-01T00:00:00'; // GANTI TANGGAL ANNIVERSARY ANDA
const targetTime = new Date(TARGET_DATE).getTime();
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
  if (!countdownElement) return;

  const now = new Date().getTime();
  const distance = targetTime - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    clearInterval(countdownInterval);
    countdownElement.innerHTML = "<span style='color: var(--accent);'>🎉 HAPPY ANNIVERSARY! 🎉</span>";
  } else {
    countdownElement.innerHTML = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
  }
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// ===== SCROLL FUNCTION (FIXED FOR NEW HEADER CLASS) =====
function scrollToTarget(button){
  const targetId = button.getAttribute('data-target');
  const targetElement = document.querySelector(targetId);
  if(targetElement){
    // FIX: Mengganti '.mem-header' menjadi '.site-header'
    const headerElement = document.querySelector('.site-header');
    const headerHeight = headerElement ? headerElement.offsetHeight : 0; 
    const offsetPosition = targetElement.offsetTop - headerHeight - 10;

    window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
    });
  }
}

// ===== CHAT DATA (UNTUK chat.html) =====
const chatData = [
    {side: 'right', text: 'permisi, numpang tanya', ts: '19:40'},
    {side: 'left', text: 'iya kenapa?', ts: '19:40'},
    {side: 'right', text: 'nama ibuk siapa?', ts: '19:40'},
    {side: 'left', text: 'ibukku?', ts: '19:40'},
    {side: 'right', text: 'hehehe ya gatau', ts: '19:40'},
    {side: 'right', text: 'aku mau tanya', ts: '19:40'},
    {side: 'left', text: 'oh', ts: '19:40'},
    {side: 'right', text: 'emmmm mau nanya nama kamu', ts: '19:41'},
    {side: 'left', text: 'aku? nikita friskila pakpahan, kalo kamu?', ts: '19:42'},
    {side: 'right', text: 'salam kenal nikita, aku Elga hehe', ts: '19:43'},
    {side: 'left', text: 'salam kenal juga elga hehe', ts: '19:44'},
    {side: 'left', text: 'apa kabar?', ts: '19:44'},
    {side: 'right', text: 'baik kalo kamu?', ts: '19:45'},
    {side: 'left', text: 'baik juga kokk', ts: '19:45'},
    {side: 'right', text: 'alhamdulillah', ts: '19:45'},
    {side: 'left', text: 'iyaa', ts: '19:46'},
    {side: 'right', text: 'lagi ngapain ni?', ts: '19:50'},
    {side: 'left', text: 'lagi nugas', ts: '19:50'},
    {side: 'right', text: 'wihhh semangat nugasnya', ts: '19:50'},
    {side: 'left', text: 'makasihhh', ts: '19:51'},
    {side: 'right', text: 'gimana nugasnya lancar?', ts: '19:57'},
    {side: 'left', text: 'lancar dongg', ts: '19:57'},
    {side: 'right', text: 'gitu dong, aku seneng dengernya', ts: '19:58'},
    {side: 'left', text: 'iyaps', ts: '20:00'},
    {side: 'right', text: 'oh iya aku td sempat ngehapus pesan', ts: '20:02', deleted: true},
    {side: 'left', text: '🚫Pesan Telah Dihapus🚫', ts: '20:03'},
    {side: 'right', text: 'EH SALKIR', ts: '20:03'},
    {side: 'right', text: 'ga, td uda', ts: '20:03'},
    {side: 'left', text: 'salkir itu yang tingkah orang aneh liat crush nya bukan?', ts: '20:04'},
    {side: 'left', text: 'kemana?', ts: '20:04'},
    {side: 'right', text: 'salting itumah', ts: '20:05'},
    {side: 'right', text: 'krumaa temen', ts: '20:05'},
    {side: 'left', text: 'oh iyaa', ts: '20:08'},
    {side: 'left', text: 'kirain salkir', ts: '20:08'},
    {side: 'left', text: 'loh kirain muter2 sampe puyeng', ts: '20:09'},
    {side: 'right', text: '[STICKER (PEMUDA LUCU)]', ts: '20:11', isSticker: true},
    {side: 'right', text: 'niatnya si gitu', ts: '20:11'},
    {side: 'left', text: 'kenapa gajadi?', ts: '20:12'},
    {side: 'right', text: 'mager dek', ts: '20:13'},
    {side: 'left', text: 'dari kapan?', ts: '20:13'},
    {side: 'right', text: 'baru', ts: '20:14'},
    {side: 'left', text: 'loh, tapi gapapa deh. pulang nya ati ati yaa!', ts: '20:14'},
    {side: 'right', text: 'siap sayangnya aku', ts: '20:15'},
];

function generateChatBubbles() {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return; 

    chatBody.innerHTML = ''; // Clear existing content

    chatData.forEach(chat => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble', chat.side);
        
        const txt = document.createElement('div');
        txt.classList.add('txt');
        
        let content = chat.text;

        // Handle deleted message style
        if (chat.deleted) {
            bubble.classList.add('deleted');
            content = '🚫 Pesan ini telah dihapus';
        }

        // Handle sticker/audio placeholder
        if (chat.isSticker) {
            bubble.classList.add('sticker');
            content = `🖼️ Sticker: ${chat.text}`;
        }

        // Add content and timestamp
        txt.innerHTML = `${content} <span class="timestamp">${chat.ts}</span>`;
        
        bubble.appendChild(txt);
        chatBody.appendChild(bubble);
    });

    // Scroll ke bawah setelah chat dimuat
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Hanya jalankan fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    generateChatBubbles();
});

// --- AKHIR COPY PASTE SELURUHNYA KE FILE script.js ---
