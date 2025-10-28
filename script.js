/* --- MULAI COPY PASTE SELURUHNYA KE FILE script.js --- */

// ===== CONSTANTS =====
const AUTH_KEY = 'kenangan_verified';
const LOGIN_PAGE = 'index.html';
const CAROUSEL_DURATION = 7000; // 7 detik

// ===== AUTH CHECK & LOGOUT (Menggunakan sessionStorage) =====
function checkAuth() {
    // Hanya berlaku di sub-page, bukan di index.html
    if (window.location.pathname.includes(LOGIN_PAGE) || window.location.pathname === '/') {
        return;
    }
    if (sessionStorage.getItem(AUTH_KEY) !== 'true') {
        window.location.href = LOGIN_PAGE;
    }
}

function doLogout() {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = LOGIN_PAGE;
}

checkAuth();

// ===== COUNTDOWN (Stabil) =====
const TARGET_DATE = '2025-11-01T00:00:00';
const targetTime = new Date(TARGET_DATE).getTime();
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetTime - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    clearInterval(countdownInterval);
    if(countdownElement) countdownElement.innerHTML = "<span style='color: var(--accent);'>ð HAPPY ANNIVERSARY! ð</span>";
  } else if (countdownElement) {
    countdownElement.innerHTML = `${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik`;
  }
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();


// ===== SCROLL FUNCTION (Stabil) =====
function scrollToTarget(button){
  const targetId = button.getAttribute('data-target');
  const targetElement = document.querySelector(targetId);
  if(targetElement){
    const headerElement = document.querySelector('.site-header') || document.querySelector('.mem-header');
    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
    const offset = targetElement.offsetTop - headerHeight - 20; 
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
}


// ===== CHAT DATA (Diperbarui dengan status 'read') =====
const chatData = [
  {side: 'left', text: 'haiiii, salken', ts: '19:45'},
  {side: 'right', text: 'siapa', ts: '19:45', status: 'read'},
  {side: 'left', text: 'kenalan boleh?', ts: '19:46'},
  {side: 'right', text: 'udh kenal kok', ts: '19:46', status: 'read'},
  {side: 'left', text: 'oh iyaa, gajadi kenalan lagi dongg', ts: '19:47'},
  {side: 'right', text: 'iyasih', ts: '19:47', status: 'read'},
  {side: 'left', text: 'kirain gakenal', ts: '19:48'},
  {side: 'right', text: 'kan udh prnh ketemu', ts: '19:48', status: 'read'},
  {side: 'left', text: 'dimana', ts: '19:48'},
  {side: 'right', text: 'lupaa', ts: '19:49', status: 'read'},
  {side: 'left', text: 'kalo ga salah dirumahku yaa?', ts: '19:49'},
  {side: 'right', text: 'gatau', ts: '19:50', status: 'read'},
  {side: 'left', text: 'kok gatau? kan km yang datang', ts: '19:51'},
  {side: 'right', text: 'bkn aku wkwk', ts: '19:51', status: 'read'},
  {side: 'left', text: 'oalah, iyaa', ts: '19:52'},
  {side: 'right', text: 'yaudah', ts: '19:52', status: 'read'},
  {side: 'left', text: 'udah? chat nya sampai sini aja nih?', ts: '19:52'},
  {side: 'right', text: 'iya', ts: '19:53', status: 'read'},
  {side: 'left', text: 'jangan dongg, masak aku sapa cuman mau dibilang iya', ts: '19:53'},
  {side: 'right', text: 'ya trs mau lu gmn', ts: '19:54', status: 'read'},
  {side: 'left', text: 'mau chatan sama km', ts: '19:55'},
  {side: 'right', text: 'yaudah', ts: '19:55', status: 'read'},
  {side: 'left', text: 'kamu lagi apa?', ts: '19:55'},
  {side: 'right', text: 'lagi di jln', ts: '19:55', status: 'read'},
  {side: 'left', text: 'kemana?', ts: '19:56'},
  {side: 'right', text: 'muter2', ts: '19:56', status: 'read'},
  {side: 'left', text: 'sama siapa?', ts: '19:56'},
  {side: 'right', text: 'sm kawan', ts: '19:57', status: 'read'},
  {side: 'left', text: 'oalah, semangat muter2 nya yaa', ts: '19:57'},
  {side: 'right', text: '[STICKER (PEMUDA LUCU)]', ts: '19:57', status: 'read'},
  {side: 'left', text: 'jangan lupa sholat', ts: '19:58'},
  {side: 'right', text: 'iya', ts: '19:58', status: 'read'},
  {side: 'right', text: 'lu jg', ts: '19:58', status: 'read'},
  {side: 'left', text: 'udah kok', ts: '19:59'},
  {side: 'right', text: 'kirain blm', ts: '19:59', status: 'read'},
  {side: 'left', text: 'aku ga lupaa', ts: '20:00'},
  {side: 'right', text: 'ya bagus', ts: '20:00', status: 'read'},
  {side: 'left', text: 'hehe', ts: '20:01'},
  {side: 'right', text: 'makan dlu gih', ts: '20:01', status: 'read'},
  {side: 'left', text: 'aku udah makan kok', ts: '20:01'},
  {side: 'right', text: 'bagus', ts: '20:02', status: 'read'},
  {side: 'left', text: 'kamu udah makan belom?', ts: '20:02'},
  {side: 'right', text: 'udah td', ts: '20:03', status: 'read'},
  {side: 'left', text: 'ð«Pesan Telah Dihapusð«', ts: '20:03', deleted: true},
  {side: 'right', text: 'EH SALKIR', ts: '20:03', status: 'read'},
  {side: 'right', text: 'ga, td uda', ts: '20:03', status: 'read'},
  {side: 'left', text: 'salkir itu yang tingkah orang aneh liat crush nya bukan?', ts: '20:04'},
  {side: 'left', text: 'kemana?', ts: '20:04'},
  {side: 'right', text: 'salting itumah', ts: '20:05', status: 'read'},
  {side: 'right', text: 'krumaa temen', ts: '20:05', status: 'read'},
  {side: 'left', text: 'oh iyaa', ts: '20:08'},
  {side: 'left', text: 'kirain salkir', ts: '20:08'},
  {side: 'left', text: 'loh kirain muter2 sampe puyeng', ts: '20:09'},
  {side: 'right', text: '[STICKER (PEMUDA LUCU)]', ts: '20:11', status: 'read'},
  {side: 'right', text: 'niatnya si gitu', ts: '20:11', status: 'read'},
  {side: 'left', text: 'kenapa gajadi?', ts: '20:12'},
  {side: 'right', text: 'mager dek', ts: '20:13', status: 'read'},
  {side: 'left', text: 'dari kapan?', ts: '20:13'}
];

// --- FUNGSI RENDER CHAT ---
function renderChat() {
    const chatBody = document.getElementById('chatBody');
    if (!chatBody) return;
    
    chatBody.innerHTML = chatData.map(chat => {
        const isDeleted = chat.deleted ? ' deleted' : '';
        let checkmarkIcon = '';
        
        if (chat.side === 'right') {
            const checkClass = chat.status === 'read' ? ' read' : ' sent';
            // Hanya 1 centang jika pesan terhapus
            if (chat.deleted) {
                 checkmarkIcon = `<span class="checkmark sent">â</span>`; 
            } else {
                 checkmarkIcon = `<span class="checkmark${checkClass}">ââ</span>`;
            }
        }

        let content;
        if (chat.deleted) {
            content = `<span class="deleted-msg">${chat.text}</span>`;
        } else {
            content = chat.text;
        }

        return `
            <div class="bubble ${chat.side}${isDeleted}">
                <div class="txt">
                    ${content}
                    <div class="meta">
                        <span class="timestamp">${chat.ts}</span>
                        ${checkmarkIcon}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    chatBody.scrollTop = chatBody.scrollHeight;
}

if (document.getElementById('chatBody')) {
    renderChat();
}


// ===== CAROUSEL LOGIC (Geser Manual + Otomatis 7 Detik) =====
function initCarousel(track) {
    const slides = track.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;
    const container = track.parentElement;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;
    const AUTO_SLIDE_DURATION = CAROUSEL_DURATION; 

    function updateSlideWidth() {
        slides.forEach(slide => {
            slide.style.width = track.offsetWidth + 'px';
        });
        goToSlide(currentSlide, false); // No smooth scroll on resize
    }
    
    function goToSlide(index, smooth = true) {
        if (index < 0) {
            currentSlide = slideCount - 1;
        } else if (index >= slideCount) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        track.style.scrollBehavior = smooth ? 'smooth' : 'auto';
        track.scrollLeft = currentSlide * track.offsetWidth;
        track.style.scrollBehavior = 'smooth'; 
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, AUTO_SLIDE_DURATION);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    // Tambahkan Tombol Navigasi (jika belum ada)
    if (!container.querySelector('.prev-btn')) {
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-nav-btn prev-btn';
        prevBtn.innerHTML = '&#10094;'; 
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(currentSlide - 1);
            startAutoSlide();
        });

        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-nav-btn next-btn';
        nextBtn.innerHTML = '&#10095;'; 
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            goToSlide(currentSlide + 1);
            startAutoSlide();
        });
        container.appendChild(prevBtn);
        container.appendChild(nextBtn);
    }

    let scrollTimeout;
    track.addEventListener('scroll', () => {
        stopAutoSlide(); 
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollPos = track.scrollLeft;
            const slideWidth = track.offsetWidth;
            currentSlide = Math.round(scrollPos / slideWidth);
            startAutoSlide(); 
        }, 300); 
    });

    window.addEventListener('resize', updateSlideWidth);

    updateSlideWidth();
    startAutoSlide();
}


// ===== BOTTOM NAV & MENU TOGGLE LOGIC =====
function setActiveBottomNav() {
    const navItems = document.querySelectorAll('.nav-bottom .nav-item');
    const currentPath = window.location.pathname.split('/').pop() || 'kenangan.html';

    navItems.forEach(item => {
        item.classList.remove('active');
        const itemHref = item.getAttribute('href');
        
        if (itemHref === currentPath || (currentPath === 'kenangan.html' && itemHref === 'kenangan.html')) {
            item.classList.add('active');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navOverlay = document.getElementById('navOverlay');
    const body = document.body;

    function openMenu() {
        if (!mobileNav || !navOverlay) return;
        mobileNav.classList.add('is-open');
        navOverlay.classList.add('is-open');
        body.style.overflow = 'hidden'; 
    }

    function closeMenu() {
        if (!mobileNav || !navOverlay) return;
        mobileNav.classList.remove('is-open');
        navOverlay.classList.remove('is-open');
        body.style.overflow = ''; 
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', openMenu);
    }
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }
    
    if (document.querySelector('.nav-bottom')) {
        setActiveBottomNav();
    }
});


/* --- AKHIR COPY PASTE SELURUHNYA KE FILE script.js --- */
