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
// Ganti path/URL gambar di sini!
const STICKER_URL = "https://cdn.jsdelivr.net/gh/twemoji/twemoji@14.0.2/assets/svg/1f92c.svg"; // Emoji 🤬 untuk placeholder sticker
const IMAGE_URL_1 = "https://picsum.photos/id/401/300/300"; // Ganti dengan foto kamu
const IMAGE_URL_2 = "https://picsum.photos/id/237/300/300"; // Ganti dengan foto kamu lainnya

const whatsappChat = [
  {type: 'text', side: 'left', content: 'kiw kiw', ts: '16:09'},
  {type: 'text', side: 'right', content: 'tkg paket kah?', ts: '16:10'},
  {type: 'text', side: 'left', content: 'iya mau nganter paket ini', ts: '16:10'},
  {type: 'image', side: 'right', content: IMAGE_URL_1, caption: 'Ihh lucu banget yaaa foto ini. Aku upload di sini hihi!', ts: '16:15'},
  {type: 'sticker', side: 'left', content: STICKER_URL, ts: '16:16'},
  {type: 'text', side: 'right', content: 'km intel kah😞😞', ts: '16:28'},
  {type: 'text', side: 'left', content: 'YAHHH\nketauan😭😭😭😭', ts: '16:30'}, // \n akan menjadi <br>
  {type: 'text', side: 'right', content: 'NAH KAN ANJIR', ts: '16:31'},
  {type: 'text', side: 'left', content: 'yauda maap ya😔🙏🏻', ts: '16:33'},
  {type: 'audio', side: 'right', content: '0:15', ts: '16:34'}, // Voice Note Placeholder
  {type: 'text', side: 'left', content: 'pliss\nnnti paketnya aku kasih free ongkir deh', ts: '16:34'},
  {type: 'image', side: 'left', content: IMAGE_URL_2, caption: 'Ini foto kita pas jalan² pertama kali, malu tapi mau 😜', ts: '17:10'},
  {type: 'deleted', side: 'right', content: 'Pesan Telah Dihapus', ts: '20:03'},
  {type: 'text', side: 'right', content: 'EH SALKIR', ts: '20:03'},
  {type: 'text', side: 'left', content: 'salkir itu yang tingkah orang aneh liat crush nya bukan?', ts: '20:04'},
  {type: 'text', side: 'left', content: 'kemana?', ts: '20:04'},
  {type: 'text', side: 'right', content: 'salting itumah', ts: '20:05'},
];

function populateChat(chatBodyElement){
  chatBodyElement.innerHTML = '';
  
  // Fungsi untuk membuat elemen HTML dengan class tertentu
  const createEl = (tag, className) => {
      const el = document.createElement(tag);
      if (className) el.className = className;
      return el;
  }

  whatsappChat.forEach(m => {
    const wrap = createEl('div', `bubble ${m.side} ${m.type}`); 
    const txt = createEl('div', 'txt');
    
    let contentHTML = '';

    if (m.type === 'image' || m.type === 'sticker') {
        const media = createEl('div', 'media-content');
        const img = createEl('img');
        img.src = m.content;
        img.alt = m.type === 'image' ? (m.caption || 'Photo') : 'Sticker';
        
        media.appendChild(img);
        contentHTML += media.outerHTML;

        if (m.caption && m.type === 'image') {
            contentHTML += `<p class="caption">${m.caption}</p>`;
        }
        
    } else if (m.type === 'audio') {
        // Voice Note
        contentHTML = `<span style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.5rem;">🎙️</span> 
                        Voice Note (${m.content})
                      </span>`;
    } else if (m.type === 'deleted') {
        // Deleted Message
        contentHTML = `<em>🚫 ${m.content}</em>`;
    } else {
        // Text Message, replace \n with <br>
        contentHTML = m.content.replace(/\n/g, '<br>');
    }
    
    txt.innerHTML = contentHTML;

    // Time Stamp and Status (Read/Sent)
    const ts = createEl('div', 'ts');
    
    // Status (double checkmark for 'right' side)
    const readReceipt = m.side === 'right' ? '<span style="color: var(--wa-sent); margin-left: 4px;">✓✓</span>' : '';
    
    // Posisikan waktu di dalam bubble (menggunakan CSS absolute)
    ts.innerHTML = `${m.ts}${readReceipt}`;

    // Append elements
    txt.appendChild(ts); // Masukkan timestamp ke dalam bubble text
    wrap.appendChild(txt);
    chatBodyElement.appendChild(wrap);
  });
  
  // Auto scroll ke bawah setelah chat dimuat
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
    
    // Gunakan scrollWidth untuk mengukur jarak slide
    const slideGap = 20; // Sesuai dengan CSS gap
    
    function updateActiveSlide() {
        const scrollLeft = carouselTrack.scrollLeft;
        // Hitung indeks tengah dengan memperhitungkan lebar slide + gap
        const slideWidth = slides[0].offsetWidth; 
        const centerIndex = Math.round(scrollLeft / (slideWidth + slideGap)); 

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
        // Hitung jarak scroll untuk slide berikutnya
        const slideWidth = slides[0].offsetWidth; 
        const nextIndex = (currentIndex + 1) % slides.length;
        
        carouselTrack.scroll({
            left: nextIndex * (slideWidth + slideGap),
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
