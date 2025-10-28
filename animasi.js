/* --- MULAI COPY PASTE SELURUHNYA KE FILE animasi.js --- */

// --- INISIASI & SETUP ---
const bg = document.querySelector('.bg-hearts');
const introScreenOverlay = document.querySelector('.intro-screen'); 
const mainPage = document.querySelector('main');

// Seleksi elemen spesifik untuk animasi berurutan (FIXED CLASS)
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

// Tambahkan event listener ke semua elemen audio
document.addEventListener('DOMContentLoaded', () => {
    allTracks.forEach(track => {
        track.addEventListener('play', () => stopAllAudio(track));
    });
});

// --- 1. LOGIKA INTRO TYPING ---
function showNextText() {
  if (!introScreenOverlay || !introTextElement) {
      // Jika di halaman sub-page yang tidak memiliki intro, langsung reveal
      if (mainPage) {
          mainPage.classList.remove('hidden');
          startMemoryReveal();
      }
      return; 
  }

  if (textIndex >= introTexts.length) {
    // Selesai, mulai transisi ke halaman utama
    setTimeout(fadeOutIntro, 500);
    return;
  }

  introTextElement.textContent = introTexts[textIndex];
  introTextElement.classList.add('is-visible');

  setTimeout(() => {
    introTextElement.classList.remove('is-visible'); 
    setTimeout(() => {
      textIndex++;
      showNextText();
    }, TEXT_FADE_DURATION); 
  }, TEXT_DISPLAY_DURATION); 
}


// --- 2. TRANSISI KE HALAMAN UTAMA ---
function fadeOutIntro() {
  if (!introScreenOverlay || !mainPage) return;

  introScreenOverlay.classList.add('fade-out');
  
  // Tampilkan konten utama
  mainPage.classList.remove('hidden');

  // Mulai animasi reveal
  startMemoryReveal();
  
  // Mainkan BGM
  if (bgm) {
    bgm.volume = 0.5;
    bgm.play().catch(e => console.log('BGM Play failed:', e)); // Menangani error play()
  }

  // Hapus overlay setelah transisi selesai
  setTimeout(() => {
    introScreenOverlay.remove();
    document.body.style.overflow = 'auto';
  }, 1000);
}


// --- 3. LOGIKA REVEAL SEQUENTIAL ---
function startMemoryReveal() {
    if (!mainPage) return;

    // Tambahkan background hearts jika belum ada
    if (bg) {
        // Logika untuk generate hearts di sini (jika belum ada)
        if (bg.children.length === 0) {
             for (let i = 0; i < 7; i++) {
                const span = document.createElement('span');
                span.innerHTML = '💖'; 
                bg.appendChild(span);
             }
        }
    }

    // Hanya jalankan animasi untuk elemen yang ada di halaman
    if (header) {
        setTimeout(() => {
            header.classList.add('show');
        }, INITIAL_DELAY);
    }
    
    if (countdownContainer) {
        setTimeout(() => {
            countdownContainer.parentElement.classList.add('show');
        }, INITIAL_DELAY + SECTION_DELAY);
    }
    
    if (menuGrid) {
        setTimeout(() => {
            menuGrid.parentElement.classList.add('show');
        }, INITIAL_DELAY + SECTION_DELAY * 2);
    }


    // Reveal Content Sections satu per satu (untuk sub-page)
    setTimeout(() => {
        // Ambil ulang contentSections di subpage jika tidak ada di homepage
        const sections = document.querySelectorAll('.content-section');
        sections.forEach((section, index) => {
            // Adjust index and delay for subpages
            const delay = 500 + 400 * index; 
            setTimeout(() => {
                section.classList.add('show');
                
                // Khusus Carousel, inisialisasi setelah terlihat
                if (section.id === 'sectionPhotos') {
                    const carouselTrack = section.querySelector('.carousel-track');
                    // initCarousel tidak diperlukan karena menggunakan CSS scroll
                }

            }, delay); 
        });
    }, INITIAL_DELAY);
}


// --- 4. START POINT ---
window.addEventListener('load', () => {
    // Pada load, kita ingin memastikan body disembunyikan untuk animasi intro
    document.body.style.overflow = 'hidden';

    // Cek apakah ini halaman utama (yang punya intro screen)
    if (introScreenOverlay && mainPage) {
        introScreenOverlay.style.display = 'flex'; 
        showNextText();
    } else if (mainPage) {
        // Jika ini sub-page, tampilkan konten utama dan mulai reveal
        mainPage.classList.remove('hidden');
        document.body.style.overflow = 'auto'; // Pastikan bisa di scroll
        startMemoryReveal();
    }
});

/* --- AKHIR COPY PASTE SELURUHNYA KE FILE animasi.js --- */
