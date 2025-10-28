// =============================================================
// File: love/js/script.js
// =============================================================

const AUTH_KEY = 'auth_granted';
const TARGET_PAGE = 'kenangan.html';
const LOGIN_PAGE = 'index.html';

// Tanggal Jadian & Anniversary
const START_DATE = new Date('2024-08-03T00:00:00'); 
const ANNIVERSARY_DATE_STR = 'November 01, 2024 00:00:00';
const ANNIVERSARY_DATE = new Date(ANNIVERSARY_DATE_STR).getTime(); 

// -----------------------------------------------------------------
// A. KEAMANAN & OTENTIKASI (Berjalan di SEMUA halaman konten)
// -----------------------------------------------------------------

function checkAuthAndRedirect() {
    // Jika berada di halaman login (index.html), tidak perlu cek auth
    if (window.location.pathname.includes(LOGIN_PAGE)) {
        // Jika sudah login tapi mencoba akses index.html, redirect ke homepage
        if (sessionStorage.getItem(AUTH_KEY) === 'true') {
            window.location.replace(TARGET_PAGE);
        }
        return; 
    }

    // Jika di halaman konten, cek otentikasi
    if (sessionStorage.getItem(AUTH_KEY) !== 'true') {
        // FIX BUG: Menggunakan replace() mencegah loop histori browser
        window.location.replace(LOGIN_PAGE);
    } else {
        // Tampilkan konten setelah otentikasi sukses
        document.querySelector('main').classList.remove('hidden');
    }
}

// Catatan: Menggunakan sessionStorage memastikan logout otomatis saat browser ditutup
document.addEventListener('DOMContentLoaded', checkAuthAndRedirect);


// -----------------------------------------------------------------
// B. COUNTERS (Berjalan di kenangan.html)
// -----------------------------------------------------------------

function updateDaysCount() {
    const now = new Date();
    const diffTime = Math.abs(now - START_DATE);
    // Pembulatan ke atas agar hari saat ini langsung terhitung
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    const daysCountElement = document.getElementById('daysCount');
    if (daysCountElement) {
        daysCountElement.textContent = diffDays + ' Hari';
    }
}

function updateAnniversaryCountdown() {
    const now = new Date().getTime();
    const distance = ANNIVERSARY_DATE - now;
    const countdownElement = document.getElementById("anniversaryCountdown");

    if (!countdownElement) return;

    // Perhitungan waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance > 0) {
        countdownElement.innerHTML = `<span class="countdown-value">${days}</span> Hari : <span class="countdown-value">${hours}</span> Jam : <span class="countdown-value">${minutes}</span> Menit : <span class="countdown-value">${seconds}</span> Detik`;
    } else {
        clearInterval(timerInterval);
        countdownElement.innerHTML = "🎉 **HARI JADI KITA!** 🎉";
        countdownElement.classList.add('anniversary-reached');
    }
}

let timerInterval;

if (document.getElementById('daysCount')) {
    updateDaysCount();
    updateAnniversaryCountdown();
    timerInterval = setInterval(updateAnniversaryCountdown, 1000);
}


// -----------------------------------------------------------------
// C. BGM TOGGLE (Berjalan di SEMUA halaman konten)
// -----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    const bgmToggle = document.getElementById('bgm-toggle');

    if (bgm && bgmToggle) {
        // Coba putar musik saat user berinteraksi
        bgmToggle.addEventListener('click', () => {
            if (bgm.paused) {
                bgm.play().then(() => {
                    bgmToggle.innerHTML = '🔊';
                }).catch(error => {
                    console.log("Autoplay blocked. Tap again.");
                });
            } else {
                bgm.pause();
                bgmToggle.innerHTML = '🔇';
            }
        });
        
        // Atur status awal tombol berdasarkan session
        if (sessionStorage.getItem('bgm_state') === 'playing') {
             // Memungkinkan musik diputar otomatis setelah interaksi pertama
            bgm.play().then(() => {
                bgmToggle.innerHTML = '🔊';
            }).catch(() => {
                // Jika masih diblokir, tetap diam
                bgmToggle.innerHTML = '🔇';
            });
        }
        
        // Simpan status musik di session storage
        bgm.addEventListener('play', () => sessionStorage.setItem('bgm_state', 'playing'));
        bgm.addEventListener('pause', () => sessionStorage.setItem('bgm_state', 'paused'));
    }
});


// -----------------------------------------------------------------
// D. CAROUSEL (Berjalan di photos.html)
// -----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-nav-btn.prev');
    const nextButton = document.querySelector('.carousel-nav-btn.next');
    
    if (track && slides.length > 0) {
        let currentIndex = 0;
        const slideWidth = slides[0].clientWidth;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        // Auto-slide (opsional)
        // setInterval(() => {
        //     currentIndex = (currentIndex + 1) % slides.length;
        //     updateCarousel();
        // }, 5000); 
    }
});
