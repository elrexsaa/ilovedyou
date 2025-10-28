/* --- MULAI COPY PASTE SELURUHNYA KE FILE animasi.js --- */

// --- INISIASI & SETUP ---
const bg = document.querySelector('.bg-hearts');
const introScreenOverlay = document.querySelector('.intro-screen'); 
const mainPage = document.querySelector('main');
const allRevealSections = document.querySelectorAll('.reveal-section');

// Elemen Audio & Teks Intro (Hanya untuk halaman utama)
const introTextElement = document.getElementById('intro-text');
const introTexts = [
  "our memories website",
  "this is our story",
  "hope u like it"
];
let textIndex = 0;

const TEXT_DISPLAY_DURATION = 2500; 
const TEXT_FADE_DURATION = 800;    
const INITIAL_DELAY = 1000; 
const SECTION_DELAY = 800;  

// --- 1. SETUP HEARTS (kode love random) ---
function initHearts() {
  if (!bg) return;
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('span');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
    heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
    bg.appendChild(heart);
  }
}

// --- 2. LOGIKA ANIMASI TEKS INTRO (Hanya Homepage) ---
function showNextText() {
  if (textIndex >= introTexts.length) {
    
    // --- AKHIR ANIMASI: SEMBUNYIKAN INTRO SCREEN ---
    setTimeout(() => {
      introScreenOverlay.classList.add('fade-out'); 
      
      setTimeout(() => {
        introScreenOverlay.style.display = 'none'; 
        if(mainPage) mainPage.classList.remove('hidden'); 
        document.body.style.overflowY = 'auto'; 
        
        // --- MEMULAI SEQUENTIAL REVEAL ---
        startHomepageReveal();
      }, 500); 
      
    }, TEXT_DISPLAY_DURATION + TEXT_FADE_DURATION);

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


// --- 3. LOGIKA REVEAL SEQUENTIAL (Homepage) ---
function startHomepageReveal() {
  allRevealSections.forEach((section, index) => {
    const delay = INITIAL_DELAY + (SECTION_DELAY * index);
    setTimeout(() => {
        section.classList.add('show');
    }, delay);
  });
}

// --- 4. LOGIKA REVEAL SUB-HALAMAN ---
function startSubpageReveal() {
  if(mainPage) mainPage.classList.remove('hidden');
  document.body.style.overflowY = 'auto';

  allRevealSections.forEach((section, index) => {
    // Delay lebih cepat untuk sub-halaman
    const delay = 100 + (150 * index); 
    setTimeout(() => {
        section.classList.add('show');
    }, delay);
  });
}

// --- 5. START POINT ---
window.addEventListener('load', () => {
  // Selalu jalankan animasi hati
  initHearts();

  // Cek apakah ini halaman utama (ada intro-screen) atau sub-halaman
  if (introScreenOverlay) {
    // Ini Homepage
    document.body.style.overflow = 'hidden';
    introScreenOverlay.style.display = 'flex'; 
    showNextText();
  } else {
    // Ini Sub-Halaman
    startSubpageReveal();
  }
});

/* --- AKHIR COPY PASTE SELURUHNYA KE FILE animasi.js --- */
