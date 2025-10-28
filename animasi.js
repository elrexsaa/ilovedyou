/* --- MULAI COPY PASTE SELURUHNYA KE FILE animasi.js --- */

// --- INISIASI & SETUP ---
const introScreenOverlay = document.querySelector('.intro-screen'); 
const mainPage = document.querySelector('main');

// Seleksi elemen spesifik untuk animasi berurutan
const header = document.querySelector('.site-header'); 
const countdownContainer = document.querySelector('.countdown-container');
const menuGrid = document.querySelector('.menu-grid');
const contentSections = document.querySelectorAll('.content-section'); 

// Elemen Audio
const bgm = document.getElementById('bgm');
const allTracks = document.querySelectorAll('.music-card audio'); 
const initCarousel = typeof window.initCarousel === 'function' ? window.initCarousel : (el) => console.warn('initCarousel not found, skipping carousel init.');

const introTexts = [
  "Our Memories Website",
  "This is Our Story",
  "Hope You Like It"
];

let textIndex = 0;
const introTextElement = document.getElementById('intro-text');
const TEXT_DISPLAY_DURATION = 2300; 
const TEXT_FADE_DURATION = 600;    
const INITIAL_DELAY = 1000; 
const SECTION_DELAY = 600;  


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

if (bgm) {
    bgm.addEventListener('play', () => stopAllAudio(bgm));
}
allTracks.forEach(track => {
    track.addEventListener('play', () => stopAllAudio(track));
});

// --- 2. LOGIKA INTRO TEXT (TYPING/FADE) ---
function showNextText() {
  if (!introTextElement) return;

  if (textIndex >= introTexts.length) {
    introScreenOverlay.classList.add('fade-out');
    mainPage.classList.remove('hidden');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      introScreenOverlay.style.display = 'none';
      startMemoryReveal(); 
      if (bgm && bgm.paused) {
         bgm.play().catch(e => console.log('Autoplay BGM diblokir setelah intro.'));
      }
      if(typeof initNavMenu === 'function') initNavMenu();

    }, TEXT_FADE_DURATION);
    return;
  }
  
  const currentText = introTexts[textIndex];
  
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


// --- 3. LOGIKA REVEAL SEQUENTIAL (Animasi Masuk Konten) ---
function startMemoryReveal() {
    // Array elemen yang di-reveal secara berurutan
    const sectionsToReveal = [header, countdownContainer, menuGrid];
    
    sectionsToReveal.forEach((el, index) => {
        if (el) {
            setTimeout(() => {
                el.classList.add('show');
            }, INITIAL_DELAY + SECTION_DELAY * index);
        }
    });

    // Reveal Content Sections satu per satu (untuk sub-halaman/bagian lain)
    const initialDelayForContent = INITIAL_DELAY + SECTION_DELAY * sectionsToReveal.length;
    setTimeout(() => {
        contentSections.forEach((section, index) => {
            const delay = SECTION_DELAY * index;
            setTimeout(() => {
                section.classList.add('show');
                
                if (section.id === 'sectionPhotos') {
                    const carouselTrack = section.querySelector('.carousel-track');
                    if (carouselTrack && typeof initCarousel === 'function') { 
                        setTimeout(() => initCarousel(carouselTrack), 100); 
                    }
                }

            }, delay); 
        });
    }, initialDelayForContent); 
}


// --- 4. START POINT ---
window.addEventListener('load', () => {
  if (introScreenOverlay && mainPage && introTextElement) {
      document.body.style.overflow = 'hidden';
      introScreenOverlay.style.display = 'flex'; 
      showNextText();
  } else if (mainPage) {
      mainPage.classList.remove('hidden');
      startMemoryReveal();
      if(typeof initNavMenu === 'function') initNavMenu();
      document.body.style.overflow = '';
  }
});
/* --- AKHIR COPY PASTE SELURUHNYA KE FILE animasi.js --- */
