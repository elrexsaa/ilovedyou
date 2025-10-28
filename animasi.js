/* --- animasi.js (Efek Intro, Reveal Konten, Audio/BGM, Carousel Logic) --- */

// --- INISIASI & SETUP ---
const introScreenOverlay = document.querySelector('.intro-screen'); 
const mainPage = document.querySelector('main');
const navBottom = document.querySelector('.nav-bottom'); // New

// Elemen Audio
const bgm = document.getElementById('bgm'); 
const allTracks = document.querySelectorAll('.music-card audio'); 
const bgmToggleBtn = document.getElementById('bgm-toggle');

const introTexts = [
  "our memories website 💖",
  "this is our story, Sayang!",
  "hope u like it, Cianku 😋",
  "loading memories..."
];

let textIndex = 0;
const introTextElement = document.getElementById('intro-text');
const TEXT_DISPLAY_DURATION = 2000; // Durasi tampil
const TEXT_FADE_DURATION = 500;    // Durasi fade
const INITIAL_DELAY = 1000; 
const SECTION_DELAY = 500; // Lebih cepat

// --- FUNGSIONALITAS AUDIO: SINGLE PLAY (Termasuk BGM) ---
function stopAllAudio(currentPlaying) {
    // 1. Stop BGM jika lagu di daftar diputar
    if (bgm && currentPlaying !== bgm && !bgm.paused) {
        bgm.pause();
        if(bgmToggleBtn) bgmToggleBtn.textContent = '🔇';
    }

    // 2. Stop semua lagu di daftar jika ada yang sedang diputar
    allTracks.forEach(track => {
      if (track !== currentPlaying && !track.paused) {
        track.pause();
        track.currentTime = 0; 
      }
    });
}

// Event listener untuk tombol BGM
if (bgmToggleBtn && bgm) {
    bgmToggleBtn.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play().then(() => {
                bgmToggleBtn.textContent = '🔊';
            }).catch(e => console.log('BGM Autoplay diblokir', e));
        } else {
            bgm.pause();
            bgmToggleBtn.textContent = '🔇';
        }
    });
    // Set initial state
    bgm.addEventListener('play', () => { bgmToggleBtn.textContent = '🔊'; });
    bgm.addEventListener('pause', () => { bgmToggleBtn.textContent = '🔇'; });
}

// Tambahkan event listener ke semua track (kecuali BGM)
allTracks.forEach(track => {
    track.addEventListener('play', () => stopAllAudio(track));
});


// --- 1. INTRO TEXT SEQUENCE (Untuk kenangan.html) ---
function showNextText() {
    if (textIndex < introTexts.length) {
        const text = introTexts[textIndex];
        let i = 0;
        const speed = 70;
        introTextElement.textContent = ''; // Reset text
        introTextElement.style.opacity = 1;

        const t = setInterval(() => {
            introTextElement.textContent += text.charAt(i) || '';
            i++;
            if (i >= text.length){
                clearInterval(t);
                textIndex++;
                
                setTimeout(() => {
                    introTextElement.style.opacity = 0; // Mulai fade out
                    setTimeout(showNextText, TEXT_FADE_DURATION); // Panggil rekursif
                }, TEXT_DISPLAY_DURATION);
            }
        }, speed);
    } else {
        // Akhir Intro, Mulai Reveal Halaman Utama
        setTimeout(endIntro, TEXT_FADE_DURATION);
    }
}

function endIntro() {
    if (introScreenOverlay) {
        introScreenOverlay.style.opacity = 0;
        document.body.style.overflowY = 'auto'; // Kembalikan scroll
        
        // Mulai BGM setelah interaksi (best practice)
        if (bgm) {
             bgm.play().catch(e => {
                 console.log("BGM tidak bisa autoplay: " + e);
                 if(bgmToggleBtn) bgmToggleBtn.textContent = '🔇';
             });
        }

        setTimeout(() => {
            introScreenOverlay.classList.add('hidden');
            if (mainPage) {
                mainPage.classList.remove('hidden');
                startMemoryReveal(); // Mulai animasi konten
            }
        }, TEXT_FADE_DURATION);
    } else {
        // Jika introScreenOverlay tidak ada (halaman lain)
        if (mainPage) {
             mainPage.classList.remove('hidden');
             startMemoryReveal();
        }
    }
}


// --- 2. CAROUSEL LOGIC (Untuk photos.html) ---
function initCarousel(track) {
    if (!track) return;
    const slides = track.querySelectorAll('.carousel-slide');
    const prevBtn = track.closest('.carousel-container').querySelector('.prev');
    const nextBtn = track.closest('.carousel-container').querySelector('.next');
    let currentIndex = 0;

    // Tambahkan style ke track
    track.style.display = 'flex';
    track.style.overflowX = 'hidden';
    track.style.scrollSnapType = 'none';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    track.style.transition = 'transform 0.5s ease-in-out';

    function moveToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));
    }
}


// --- 3. REVEAL SECTIONS ANIMATION ---
function startMemoryReveal() {
    const header = document.querySelector('.header-main');
    const countdown = document.getElementById('sectionCountdown');
    const menu = document.querySelector('.menu-grid');
    const contentSections = document.querySelectorAll('.content-section'); 
    const isKenanganPage = document.body.classList.contains('page-kenangan');

    if (header) { setTimeout(() => { header.classList.add('show'); }, INITIAL_DELAY); }

    let baseDelay = INITIAL_DELAY + (header ? SECTION_DELAY : 0);

    if (isKenanganPage) {
        // Urutan animasi di kenangan.html
        if (countdown) { setTimeout(() => { countdown.classList.add('show'); }, baseDelay); }
        if (menu) { setTimeout(() => { menu.classList.add('show'); }, baseDelay + SECTION_DELAY); }
        baseDelay += SECTION_DELAY * 2;
    } else {
        // Di halaman lain, konten langsung muncul
    }

    // Reveal Content Sections satu per satu
    contentSections.forEach((section, index) => {
        const delay = baseDelay + SECTION_DELAY * index;
        setTimeout(() => {
            section.classList.add('show');
            
            // Inisiasi Carousel (khusus photos.html)
            if (section.id === 'sectionPhotos') {
                const carouselTrack = section.querySelector('.carousel-track');
                if (carouselTrack) { 
                    setTimeout(() => initCarousel(carouselTrack), 300); 
                }
            }

        }, delay); 
    });
}


// --- 4. START POINT ---
window.addEventListener('load', () => {
    // Terapkan class untuk styling spesifik (misal: di kenangan.html)
    if (introScreenOverlay) {
        document.body.classList.add('page-kenangan');
    }

    // Sembunyikan main page saat loading
    if (mainPage) {
        mainPage.classList.add('hidden');
    }

    if (introScreenOverlay && document.body.classList.contains('page-kenangan')) {
        document.body.style.overflow = 'hidden'; // Matikan scroll saat intro
        introScreenOverlay.style.display = 'flex'; 
        showNextText();
    } else if (mainPage) {
        // Untuk halaman lain, langsung tampilkan konten
        endIntro(); 
    }
});
