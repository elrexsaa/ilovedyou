/* --- MULAI COPY PASTE SELURUHNYA KE FILE animasi.js --- */

// --- INISIASI & SETUP ---
const bg = document.querySelector('.bg-hearts');
const introScreenOverlay = document.querySelector('.intro-screen'); 
const mainPage = document.querySelector('main');

// Seleksi elemen spesifik untuk animasi berurutan
const header = document.querySelector('.mem-header') || document.querySelector('.site-header');
const countdownContainer = document.querySelector('.countdown-container');
const menuGrid = document.querySelector('.menu-grid');
const contentSections = document.querySelectorAll('.content-section'); 

// Elemen Audio
const bgm = document.getElementById('bgm');
const allTracks = document.querySelectorAll('.music-card audio'); 

const introTexts = [
  "our memories website",
  "this is our story",
  "hope u like it"
];

let textIndex = 0;
const introTextElement = document.getElementById('intro-text');
const TEXT_DISPLAY_DURATION = 2500; 
const TEXT_FADE_DURATION = 800;    
const INITIAL_DELAY = 1000; 
const SECTION_DELAY = 800;  


// --- FUNGSIONALITAS AUDIO: SINGLE PLAY ---
function stopAllAudio(currentPlaying) {
    // 1. Stop BGM jika lagu di daftar diputar
    if (bgm && currentPlaying !== bgm && !bgm.paused) {
        bgm.pause();
    }

    // 2. Stop semua lagu di daftar jika ada yang diputar
    allTracks.forEach(track => {
      if (track !== currentPlaying && !track.paused) {
        track.pause();
        track.currentTime = 0; // Reset ke awal
      }
    });
}

// Tambahkan event listener untuk mengelola BGM saat lagu lain diputar
allTracks.forEach(track => {
  track.addEventListener('play', () => stopAllAudio(track));
});


// --- 2. LOGIKA INTRO TEXT (TYPING) ---
function showNextText() {
  if (textIndex >= introTexts.length) {
    // Selesai, mulai transisi ke halaman utama
    introScreenOverlay.classList.add('fade-out');
    mainPage.classList.remove('hidden');
    
    // Tunggu transisi selesai, lalu hapus intro screen
    setTimeout(() => {
      introScreenOverlay.style.display = 'none';
      document.body.style.overflow = 'auto'; // Kembalikan scroll
      startMemoryReveal();
    }, 500); // Harus sama dengan durasi transisi CSS
    return;
  }

  const currentText = introTexts[textIndex];
  
  // Gunakan animasi ketik sederhana
  introTextElement.textContent = currentText;
  introTextElement.classList.add('is-visible');

  setTimeout(() => {
    introTextElement.classList.remove('is-visible'); 
    setTimeout(() => {
      textIndex++;
      showNextText();
    }, TEXT_FADE_DURATION); 
  }, TEXT_DISPLAY_DURATION); 
}


// --- 3. LOGIKA REVEAL SEQUENTIAL (VIDEO EFFECT) ---
function startMemoryReveal() {
    // MODIFIKASI: Coba putar BGM otomatis setelah intro screen selesai (dianggap interaksi)
    if (bgm && bgm.paused) {
        bgm.volume = 0.5; // Atur volume BGM (Opsional: 50%)
        // Gunakan .catch() karena autoplay sering diblokir, tidak perlu error fatal
        bgm.play().catch(e => console.error("BGM Autoplay Gagal:", e));
    }

    // Ambil elemen untuk halaman non-kenangan (songs, about, dll)
    const headerElement = document.querySelector('.site-header') || document.querySelector('.mem-header');
    const countdown = document.querySelector('.countdown-container');
    const menu = document.querySelector('.menu-grid');
    
    // Reveal Header
    if (headerElement) {
        setTimeout(() => {
            headerElement.classList.add('show');
        }, INITIAL_DELAY);
    }

    // Hanya tampilkan countdown dan menu jika ada (khusus kenangan.html)
    if (countdown) {
        setTimeout(() => {
            countdown.classList.add('show');
        }, INITIAL_DELAY + SECTION_DELAY);
    }
    
    if (menu) {
        setTimeout(() => {
            menu.classList.add('show');
        }, INITIAL_DELAY + SECTION_DELAY * 2);
    }


    // Reveal Content Sections satu per satu
    setTimeout(() => {
        contentSections.forEach((section, index) => {
            const startDelay = headerElement ? INITIAL_DELAY : 0; // Jika ada header, mulai dari delay header
            const delay = startDelay + SECTION_DELAY * (index + (headerElement ? 1 : 0)); // Penyesuaian delay
            
            setTimeout(() => {
                section.classList.add('show');
                
                // Khusus Carousel, inisialisasi setelah terlihat
                if (section.id === 'sectionPhotos') {
                    const carouselContainer = section.querySelector('.carousel-container');
                    // Memastikan fungsi initCarousel tersedia (Asumsi ada di script.js)
                    // Panggil initCarousel dengan container
                    if (carouselContainer && typeof initCarousel === 'function') { 
                        setTimeout(() => initCarousel(carouselContainer), 1300); 
                    }
                }

            }, delay); 
        });
    }, INITIAL_DELAY); 
}


// --- 4. START POINT ---
window.addEventListener('load', () => {
  document.body.style.overflow = 'hidden';
  if (introScreenOverlay && mainPage) {
      introScreenOverlay.style.display = 'flex'; 
      showNextText();
  } else if (mainPage) {
      // Fallback jika intro screen hilang (misal di halaman sub-page)
      mainPage.classList.remove('hidden');
      document.body.style.overflow = 'auto'; 
      startMemoryReveal();
  }
});

/* --- AKHIR COPY PASTE SELURUHNYA KE FILE animasi.js --- */
