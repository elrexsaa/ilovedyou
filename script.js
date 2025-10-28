/* --- MULAI COPY PASTE SELURUHNYA KE FILE script.js --- */

// ===== FUNGSI GLOBAL: PENGECEKAN ELEMEN =====
// Menjalankan fungsi hanya jika elemennya ada di halaman saat ini
function runOnElement(selector, func) {
  const element = document.querySelector(selector);
  if (element) {
    func(element);
  }
}

function runOnElements(selector, func) {
  const elements = document.querySelectorAll(selector);
  if (elements.length > 0) {
    func(elements);
  }
}

// ===== 1. LOGIKA MENU HAMBURGER BARU (GLOBAL) =====
function initNavMenu() {
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navOverlay = document.getElementById('navOverlay');

  if (menuToggleBtn && mobileNav && navOverlay && closeMenuBtn) {
    const openMenu = () => {
      mobileNav.classList.add('show');
      navOverlay.classList.add('show');
      document.body.style.overflow = 'hidden'; // Mencegah scroll di belakang
    };

    const closeMenu = () => {
      mobileNav.classList.remove('show');
      navOverlay.classList.remove('show');
      document.body.style.overflow = '';
    };

    menuToggleBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    navOverlay.addEventListener('click', closeMenu);
  }
}

// ===== 2. LOGIKA COUNTDOWN (Hanya untuk kenangan.html) =====
function initCountdown(element) {
  const TARGET_DATE = '2025-11-01T00:00:00';
  const targetTime = new Date(TARGET_DATE).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetTime - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(countdownInterval);
      element.innerHTML = "<span style='color: var(--accent);'>🎉 HAPPY ANNIVERSARY! 🎉</span>";
    } else {
      element.innerHTML = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
    }
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// ===== 3. LOGIKA CHAT (Hanya untuk chat.html) =====
const demoChat = [
  {side: 'left', text: 'kiw kiw', ts: '16:09'},
  {side: 'right', text: 'tkg paket kah?', ts: '16:10'},
  {side: 'left', text: 'iya mau nganter paket ini', ts: '16:10'},
  {side: 'right', text: 'oalaa', ts: '16:11'},
  {side: 'left', text: 'rumahnya dimana yaa?', ts: '16:12'},
  {side: 'right', text: 'kan jgo sulap, psti tau dong', ts: '16:13'},
  {side: 'left', text: 'wet wet sebentar', ts: '16:14'},
  {side: 'right', text: 'sipp', ts: '16:17'},
  {side: 'left', text: '📷titiknya disini cok', ts: '16:27'},
  {side: 'right', text: 'km intel kah😞😞', ts: '16:28'},
  {side: 'left', text: 'bnr kah?', ts: '16:29'},
  {side: 'right', text: 'km tmen nya gabriel ya?', ts: '16:29'},
  {side: 'right', text: 'soalnya td dia nnya', ts: '16:30'},
  {side: 'left', text: 'YAHHH', ts: '16:30'},
  {side: 'left', text: 'ketauan😭😭😭😭', ts: '16:30'},
  {side: 'right', text: 'NAH KAN ANJIR', ts: '16:31'},
  {side: 'left', text: 'yauda maap ya😔🙏🏻', ts: '16:33'},
  {side: 'right', text: 'tida mau', ts: '16:34'},
  {side: 'left', text: 'pliss', ts: '16:34'},
  {side: 'left', text: 'nnti paketnya aku kasih free ongkir deh', ts: '16:34'},
  {side: 'right', text: 'apakh ini ril', ts: '16:36'},
  {side: 'left', text: 'SANGAT RILL SEKALI', ts: '16:37'},
  {side: 'right', text: 'ok tengs ya dik', ts: '17:15'},
  {side: 'left', text: 'iya kak, dimaafin ga ni kak?', ts: '17:16'},
  {side: 'right', text: 'iya dimaapin dek', ts: '17:17'},
  {side: 'left', text: 'anjayy gitu dong', ts: '18:47'},
  {side: 'left', text: '📞Panggilan Tak Terjawab', ts: '18:47'},
  {side: 'left', text: 'eh kepencet', ts: '18:50'},
  {side: 'right', text: '[STICKER]', ts: '19:21'},
  {side: 'right', text: 'iyaa', ts: '19:21'},
  {side: 'left', text: 'wanginyaaa', ts: '19:22'},
  {side: 'left', text: 'baru mandi?', ts: '19:22'},
  {side: 'right', text: 'HA KO TAU', ts: '19:22'},
  {side: 'left', text: 'UDAH DIBILANG KAN?', ts: '19:23'},
  {side: 'right', text: 'woi anjir la', ts: '19:23'},
  {side: 'left', text: 'HAHAHAHA', ts: '19:24'},
  {side: 'left', text: 'LUCU BANGET LOH REK🤓', ts: '19:24'},
  {side: 'right', text: 'ktauan bgt ya off nya buat mandi😭', ts: '19:24'},
  {side: 'left', text: 'ya iya lah', ts: '19:25'},
  {side: 'right', text: '😞😞', ts: '19:27'},
  {side: 'left', text: 'ga keluar dek?', ts: '20:02'},
  {side: 'right', text: '🚫Pesan Telah Dihapus🚫', ts: '20:03'},
  {side: 'right', text: 'EH SALKIR', ts: '20:03'},
  {side: 'right', text: 'ga, td uda', ts: '20:03'},
  {side: 'left', text: 'salkir itu yang tingkah orang aneh liat crush nya bukan?', ts: '20:04'},
  {side: 'left', text: 'kemana?', ts: '20:04'},
  {side: 'right', text: 'salting itumah', ts: '20:05'},
  {side: 'right', text: 'krumaa temen', ts: '20:05'},
  {side: 'left', text: 'oh iyaa', ts: '20:08'},
  {side: 'left', text: 'kirain salkir', ts: '20:08'},
  {side: 'left', text: 'loh kirain muter2 sampe puyeng', ts: '20:09'},
  {side: 'right', text: '[STICKER (PEMUDA LUCU)]', ts: '20:11'},
  {side: 'right', text: 'niatnya si gitu', ts: '20:11'},
  {side: 'left', text: 'kenapa gajadi?', ts: '20:12'},
  {side: 'right', text: 'mager dek', ts: '20:13'},
  {side: 'left', text: 'dari kapan?', ts: '20:14'},
];

function populateChat(chatBodyElement){
  chatBodyElement.innerHTML = '';
  demoChat.forEach(m=>{
    const wrap = document.createElement('div');
    wrap.className = 'bubble ' + (m.side === 'right' ? 'right' : 'left');
    const txt = document.createElement('div');
    txt.className = 'txt';
    txt.textContent = m.text;
    const ts = document.createElement('div');
    ts.className = 'ts';
    ts.textContent = m.ts;
    wrap.appendChild(txt);
    wrap.appendChild(ts);
    chatBodyElement.appendChild(wrap);
  });
  chatBodyElement.scrollTop = chatBodyElement.scrollHeight;
}

// ===== 4. LOGIKA AUDIO (Hanya untuk songs.html) =====
function setupAudioListeners(audioElements) {
  // Ambil BGM dari kenangan.html (jika ada)
  const bgm = document.getElementById('bgm'); 

  function stopAllAudio(currentPlaying) {
    // 1. Stop BGM jika ada
    if (bgm && currentPlaying !== bgm && !bgm.paused) {
      bgm.pause();
    }

    // 2. Stop semua lagu di daftar
    audioElements.forEach(track => {
      if (track !== currentPlaying && !track.paused) {
        track.pause();
        track.currentTime = 0; 
      }
    });
  }

  // Event listener untuk setiap lagu di daftar
  audioElements.forEach(track => {
    track.addEventListener('play', () => stopAllAudio(track));
  });

  // Jika BGM ada, tambahkan listener
  if (bgm) {
    bgm.addEventListener('play', () => stopAllAudio(bgm));
  }
}

// ===== 5. LOGIKA CAROUSEL (Hanya untuk photos.html) =====
function initCarousel(carouselTrack) {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    let autoSlideTimer;
    let currentIndex = 0;
    
    const slideWidth = slides[0].offsetWidth + 20; // 20 adalah gap

    function updateActiveSlide() {
        const scrollLeft = carouselTrack.scrollLeft;
        const centerIndex = Math.round(scrollLeft / slideWidth); 

        slides.forEach((slide, idx) => {
          if (idx === centerIndex) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
        currentIndex = centerIndex;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        carouselTrack.scroll({
            left: currentIndex * slideWidth,
            behavior: 'smooth'
        });
        // Update active class setelah animasi scroll selesai
        setTimeout(updateActiveSlide, 450); 
    }
    
    function startAutoSlide() {
        clearInterval(autoSlideTimer); 
        autoSlideTimer = setInterval(nextSlide, 5000); 
    }
    
    carouselTrack.addEventListener('scroll', () => {
        updateActiveSlide(); 
        // Reset timer setiap kali user scroll manual
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(nextSlide, 5000);
    });

    // Inisialisasi
    carouselTrack.scrollLeft = 0;
    setTimeout(() => {
        updateActiveSlide();
        startAutoSlide();
    }, 100); 
}

// ===== INISIALISASI SAAT HALAMAN DIMUAT =====
window.addEventListener('load', () => {
  // Selalu jalankan menu navigasi
  initNavMenu();
  
  // Jalankan fungsi khusus halaman
  runOnElement('#countdown', initCountdown);
  runOnElement('#chatBody', populateChat);
  runOnElements('.music-card audio', setupAudioListeners);
  runOnElement('.carousel-track', initCarousel);
  
  // Autoplay BGM di halaman utama
  runOnElement('#bgm', (bgmElement) => {
    document.addEventListener('click', function handler() {
      if (bgmElement.paused) {
        bgmElement.play().catch(e => console.log('Autoplay BGM diblokir.'));
      }
      document.removeEventListener('click', handler);
    });
  });
});
/* --- AKHIR COPY PASTE SELURUHNYA KE FILE script.js --- */
