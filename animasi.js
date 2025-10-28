/* --- MULAI COPY PASTE SELURUHNYA KE FILE animasi.js --- */

// --- INISIASI & SETUP ---
const introScreenOverlay = document.querySelector('.intro-screen'); 
const mainPage = document.querySelector('main');

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


// --- FUNGSIONALITAS AUDIO: SINGLE PLAY (Termasuk BGM) ---
function stopAllAudio(currentPlaying) {
    // 1. Stop BGM jika lagu di daftar diputar
    if (bgm && currentPlaying !== bgm && !bgm.paused) {
        bgm.pause();
    }

    // 2. Stop semua lagu di daftar jika ada yang sedang diputar
    allTracks.forEach(track => {
      if (track !== currentPlaying && !track.paused) {
        track.pause();
        track.currentTime = 0; 
      }
    });
}

// Tambahkan event listener ke semua track (kecuali BGM)
allTracks.forEach(track => {
    track.addEventListener('play', () => stopAllAudio(track));
});

// Auto-play BGM saat user berinteraksi
function handleUserInteraction() {
    if (bgm && bgm.paused) {
        bgm.play().catch(error => {
            console.log("BGM auto-play blocked, waiting for more interaction.", error);
        });
    }
    document.removeEventListener('touchstart', handleUserInteraction);
    document.removeEventListener('click', handleUserInteraction);
}

document.addEventListener('touchstart', handleUserInteraction);
document.addEventListener('click', handleUserInteraction);


// --- LOGIKA INTRO TEXT ---
function showNextText() {
  if (!introTextElement) return;

  if (textIndex >= introTexts.length) {
    introScreenOverlay.style.opacity = '0';
    setTimeout(() => {
      introScreenOverlay.style.display = 'none';
      if (mainPage) mainPage.classList.remove('hidden');
      startMemoryReveal();
      document.body.style.overflow = ''; 
    }, TEXT_FADE_DURATION);
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


// --- LOGIKA REVEAL SEQUENTIAL ---
function startMemoryReveal() {
    const header = document.querySelector('.site-header') || document.querySelector('.mem-header');
    const countdown = document.querySelector('.countdown-container');
    const menu = document.querySelector('.menu-grid');
    const contentSections = document.querySelectorAll('.content-section'); 

    if (header) {
        setTimeout(() => { header.classList.add('show'); }, INITIAL_DELAY);
    }

    if (countdown) {
        setTimeout(() => { countdown.classList.add('show'); }, INITIAL_DELAY + SECTION_DELAY);
    }
    
    if (menu) {
        setTimeout(() => { menu.classList.add('show'); }, INITIAL_DELAY + SECTION_DELAY * 2);
    }

    // Reveal Content Sections satu per satu
    setTimeout(() => {
        contentSections.forEach((section, index) => {
            const delay = SECTION_DELAY * (index + 3);
            setTimeout(() => {
                section.classList.add('show');
                
                if (section.id === 'sectionPhotos') {
                    const carouselTrack = section.querySelector('.carousel-track');
                    if (carouselTrack && typeof initCarousel === 'function') { 
                        setTimeout(() => initCarousel(carouselTrack), 300); 
                    }
                }

            }, delay); 
        });
    }, INITIAL_DELAY); 
}


// --- 4. START POINT ---
window.addEventListener('load', () => {
  if (introScreenOverlay && mainPage) {
      document.body.style.overflow = 'hidden';
      introScreenOverlay.style.display = 'flex'; 
      showNextText();
  } else if (mainPage) {
      mainPage.classList.remove('hidden');
      startMemoryReveal();
  }
});

/* --- AKHIR COPY PASTE SELURUHNYA KE FILE animasi.js --- */
