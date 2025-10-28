/* --- MULAI COPY PASTE SELURUHNYA KE FILE script.js --- */

// ===== FUNGSI GLOBAL: PENGECEKAN ELEMEN =====
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

// ===== 1. LOGIKA NAVIGASI (Bottom Nav & Logout) =====
function initNavMenu() {
  // Hanya diperlukan untuk logika logout/desktop fallback menu
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navOverlay = document.getElementById('navOverlay');
  
  // Logic Menu Drawer (Desktop/Fallback)
  if (menuToggleBtn && mobileNav && navOverlay && closeMenuBtn) {
    const openMenu = () => {
      if (window.innerWidth > 768) { // Hanya aktif di desktop
          mobileNav.classList.add('show');
          navOverlay.classList.add('show');
          document.body.style.overflow = 'hidden'; 
      }
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
window.initNavMenu = initNavMenu;


// ===== 2. LOGIKA COUNTDOWN (kenangan.html) =====
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
      element.innerHTML = "<span style='color: var(--color-accent);'>🎉 HAPPY ANNIVERSARY! 🎉</span>";
    } else {
      element.innerHTML = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
    }
  }
  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}


// ===== 3. LOGIKA CHAT (chat.html - WA Style) =====
const STICKER_URL = "https://cdn.jsdelivr.net/gh/twemoji/twemoji@14.0.2/assets/svg/1f92c.svg"; 
const IMAGE_URL_1 = "https://picsum.photos/id/401/300/300"; 
const IMAGE_URL_2 = "https://picsum.photos/id/237/300/300"; 

const whatsappChat = [
  {type: 'text', side: 'left', content: 'kiw kiw', ts: '16:09'},
  {type: 'text', side: 'right', content: 'tkg paket kah?', ts: '16:10'},
  {type: 'image', side: 'right', content: IMAGE_URL_1, caption: 'Ihh lucu banget yaaa foto ini hihi!', ts: '16:15'},
  {type: 'sticker', side: 'left', content: STICKER_URL, ts: '16:16'},
  {type: 'audio', side: 'right', content: '0:15', ts: '16:34'}, 
  {type: 'deleted', side: 'right', content: 'Pesan Telah Dihapus', ts: '20:03'},
  {type: 'text', side: 'right', content: 'EH SALKIR', ts: '20:03'},
];

function populateChat(chatBodyElement){
  chatBodyElement.innerHTML = '';
  
  const createEl = (tag, className) => {
      const el = document.createElement(tag);
      if (className) el.className = className;
      return el;
  }

  whatsappChat.forEach(m => {
    const wrap = createEl('div', `bubble ${m.side} ${m.type}`); 
    const txt = createEl('div', 'txt');
    
    let contentHTML = '';
    const isMedia = m.type === 'image' || m.type === 'sticker';
    
    if (isMedia) {
        const media = createEl('div', 'media-content');
        const img = createEl('img');
        img.src = m.content;
        img.alt = m.type === 'image' ? (m.caption || 'Photo') : 'Sticker';
        
        media.appendChild(img);
        contentHTML += media.outerHTML;

        if (m.caption && m.type === 'image') {
             const captionP = createEl('p', 'caption');
             captionP.innerHTML = `${m.caption}`; 
             contentHTML += captionP.outerHTML;
        }
        
    } else if (m.type === 'audio') {
        contentHTML = `<span style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.5rem;">🎙️</span> 
                        Voice Note (${m.content})
                      </span>`;
    } else if (m.type === 'deleted') {
        contentHTML = `<em>Pesan Telah Dihapus</em>`;
    } else {
        contentHTML = m.content.replace(/\n/g, '<br>');
    }
    
    txt.innerHTML = contentHTML;

    const ts = createEl('div', 'ts');
    const waCheckColor = 'var(--wa-check)';
    const readReceipt = m.side === 'right' ? `<span style="color: ${waCheckColor}; margin-left: 4px;">✓✓</span>` : '';
    
    ts.innerHTML = `${m.ts}${readReceipt}`;

    if (m.type === 'image' && m.caption) {
        const captionEl = txt.querySelector('.caption');
        if (captionEl) {
            captionEl.appendChild(ts); 
        }
    } else {
        txt.appendChild(ts); 
    }

    wrap.appendChild(txt);
    chatBodyElement.appendChild(wrap);
  });
  
  chatBodyElement.scrollTop = chatBodyElement.scrollHeight;
}


// ===== 4. LOGIKA AUDIO (songs.html) =====
function setupAudioListeners(audioElements) {
  const bgm = document.getElementById('bgm'); 

  function stopAllAudio(currentPlaying) {
    if (bgm && currentPlaying !== bgm && !bgm.paused) {
      bgm.pause();
    }
    audioElements.forEach(track => {
      if (track !== currentPlaying && !track.paused) {
        track.pause();
        track.currentTime = 0; 
      }
    });
  }

  audioElements.forEach(track => {
    track.addEventListener('play', () => stopAllAudio(track));
  });

  if (bgm) {
    bgm.addEventListener('play', () => stopAllAudio(bgm));
  }
}

// ===== 5. LOGIKA CAROUSEL (photos.html) =====
function initCarousel(carouselTrack) {
    if (!carouselTrack) return;
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    let autoSlideTimer;
    let currentIndex = 0;
    const slideGap = 20; 
    
    function updateActiveSlide() {
        const scrollLeft = carouselTrack.scrollLeft;
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
        const slideWidth = slides[0].offsetWidth; 
        const nextIndex = (currentIndex + 1) % slides.length;
        const targetScroll = nextIndex * (slideWidth + slideGap);
        
        carouselTrack.scroll({
            left: targetScroll,
            behavior: 'smooth'
        });
        
        setTimeout(updateActiveSlide, 450); 
    }
    
    function startAutoSlide() {
        clearInterval(autoSlideTimer); 
        autoSlideTimer = setInterval(nextSlide, 5000); 
    }
    
    carouselTrack.addEventListener('scroll', () => {
        updateActiveSlide(); 
        clearInterval(autoSlideTimer);
        setTimeout(() => startAutoSlide(), 3000); 
    });
    
    window.addEventListener('resize', () => {
        updateActiveSlide();
    });

    carouselTrack.scrollLeft = 0;
    slides[0].classList.add('active'); 
    setTimeout(() => {
        updateActiveSlide();
        startAutoSlide();
    }, 100); 
}
window.initCarousel = initCarousel;


// ===== INISIALISASI SAAT HALAMAN DIMUAT =====
window.addEventListener('load', () => {
  runOnElement('#countdown', initCountdown);
  runOnElement('#chatBody', (el) => {
    populateChat(el); 
    // Jika elemen chat ada, pastikan carousel tidak diinisialisasi
    // (Ini hanya untuk mencegah inisialisasi ganda jika initCarousel ada di animasi.js)
  });
  runOnElements('.music-card audio', setupAudioListeners); 
  
  // Audio Autoplay pada interaksi pertama (untuk BGM)
  runOnElement('#bgm', (bgmElement) => {
    const handleInitialInteraction = () => {
      if (bgmElement.paused) {
        bgmElement.play().catch(e => console.log('Autoplay BGM diblokir.'));
      }
      document.removeEventListener('click', handleInitialInteraction);
      document.removeEventListener('touchstart', handleInitialInteraction);
    };
    document.addEventListener('click', handleInitialInteraction);
    document.addEventListener('touchstart', handleInitialInteraction);
  });
});
/* --- AKHIR COPY PASTE SELURUHNYA KE FILE script.js --- */
