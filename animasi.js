/* --- MULAI COPY PASTE SELURUHNYA KE FILE animasi.js --- */

// --- INISIASI & SETUP ---
const bg = document.querySelector('.bg-hearts');
const introScreenOverlay = document.querySelector('.intro-screen'); 
const mainPage = document.querySelector('main');

// Seleksi elemen spesifik untuk animasi berurutan
const header = document.querySelector('.site-header'); // Menggunakan class .site-header
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
    if (bgm && currentPlaying !== bgm && !bgm.paused) {
        bgm.pause();
    }
    allTracks.forEach(track => {
      if (track !== currentPlaying && !track.paused) {
        track.pause();
        track.currentTime = 0; 
      }
    });
}

// Tambahkan listener untuk BGM dan semua track
if (bgm) {
    bgm.addEventListener('play', () => stopAllAudio(bgm));
}
allTracks.forEach(track => {
    track.addEventListener('play', () => stopAllAudio(track));
});

// --- 2. LOGIKA INTRO TEXT (TYPING/FADE) ---
function showNextText() {
  if (textIndex >= introTexts.length) {
    // Selesai: Fade out intro screen dan tunjukkan konten utama
    introScreenOverlay.classList.add('fade-out');
    mainPage.classList.remove('hidden');
    document.body.style.overflow = ''; // Aktifkan scroll
    
    setTimeout(() => {
      introScreenOverlay.style.display = 'none';
      startMemoryReveal(); 
      // Autoplay BGM saat intro selesai (hanya coba sekali)
      if (bgm && bgm.paused) {
         bgm.play().catch(e => console.log('Autoplay BGM diblokir setelah intro.'));
      }
    }, TEXT_FADE_DURATION); // Tunggu fade-out selesai
    return;
  }
  
  const currentText = introTexts[textIndex];
  
  introTextElement.textContent = currentText; 
  introTextElement.classList.add('is-visible'); // Animasi fade in
  
  setTimeout(() => {
    introTextElement.classList.remove('is-visible'); // Animasi fade out
    setTimeout(() => {
      textIndex++;
      showNextText();
    }, TEXT_FADE_DURATION); // Tunggu fade out selesai
  }, TEXT_DISPLAY_DURATION); // Tahan teks selama durasi tampil
}


// --- 3. LOGIKA REVEAL SEQUENTIAL (Animasi Masuk Konten) ---
function startMemoryReveal() {
    const mainHeader = document.querySelector('.site-header'); 
    const countdown = document.querySelector('.countdown-container');
    const menu = document.querySelector('.menu-grid');
    
    // Pastikan elemen ada dan ter-reveal secara berurutan
    if (mainHeader) {
        setTimeout(() => {
            mainHeader.classList.add('show');
        }, INITIAL_DELAY);
    }

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
            const delay = SECTION_DELAY * (index + 3);
            setTimeout(() => {
                section.classList.add('show');
                
                // Khusus Carousel, inisialisasi setelah terlihat
                if (section.id === 'sectionPhotos') {
                    const carouselTrack = section.querySelector('.carousel-track');
                    // Memastikan fungsi initCarousel tersedia (Asumsi ada di script.js)
                    if (carouselTrack && typeof initCarousel === 'function') { 
                        setTimeout(() => initCarousel(carouselTrack), 1300); 
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
      // Fallback jika intro screen hilang
      mainPage.classList.remove('hidden');
      startMemoryReveal();
  }
});

/* --- AKHIR COPY PASTE SELURUHNYA KE FILE animasi.js --- */
