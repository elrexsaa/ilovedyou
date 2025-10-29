// =============================================================
// File: js/script.js (Logika Utama Website)
// =============================================================

const AUTH_KEY = 'auth_granted';
const LOGIN_PAGE = 'index.html';
const START_DATE = new Date('2024-08-03T00:00:00'); 
const ANNIVERSARY_DATE_STR = 'November 01, 2025 00:00:00'; // UBAH TAHUN SESUAI RENCANA ANNIV!
const ANNIVERSARY_DATE = new Date(ANNIVERSARY_DATE_STR).getTime(); 


// -----------------------------------------------------------------
// A. COUNTERS & ANNIVERSARY
// -----------------------------------------------------------------

function updateDaysCount() {
    const now = new Date();
    const diffTime = Math.abs(now - START_DATE);
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

    // Cek jika sudah hari H
    if (distance <= 0) {
        clearInterval(timerInterval);
        countdownElement.innerHTML = "🎉 **HARI JADI KITA!** 🎉";
        countdownElement.classList.add('anniversary-reached');
        
        // Panggil Animasi Heboh!
        showAnniversaryAnimation();
        return;
    }

    // Perhitungan waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `<span class="countdown-value">${days}</span> Hari : <span class="countdown-value">${hours}</span> Jam : <span class="countdown-value">${minutes}</span> Menit : <span class="countdown-value">${seconds}</span> Detik`;
}

let timerInterval;

function showAnniversaryAnimation() {
    const overlay = document.getElementById('anniversary-overlay');
    const mainContent = document.querySelector('main');
    
    if (overlay) {
        // Sembunyikan konten utama, tampilkan overlay
        if (mainContent) mainContent.hidden = true;
        overlay.hidden = false;
        // Opsional: Tambahkan animasi confetti heboh di sini
    }
}


// -----------------------------------------------------------------
// B. INTRO & BGM CONTROL
// -----------------------------------------------------------------

function startIntroSequence() {
    const introTextDiv = document.getElementById('intro-text');
    const introScreen = document.querySelector('.intro-screen');
    const mainContent = document.querySelector('main');
    const bgm = document.getElementById('bgm');

    // Tampilkan role di header
    const userRoleElement = document.getElementById('userRole');
    if (userRoleElement) {
        const role = sessionStorage.getItem('user_role') || 'Sayang';
        userRoleElement.textContent = (role === 'NIKITA' ? 'Welcome Back, Nikita!' : 'Hai, ' + role + '!');
    }

    // Hanya jalankan intro jika elemen ada
    if (introTextDiv && introScreen) {
        const textToType = "Selamat Datang di Dunia Kita, Sayang! 💗";
        let i = 0;
        const speed = 75;

        function typeIntro() {
            if (i < textToType.length) {
                introTextDiv.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeIntro, speed);
            } else {
                // Intro Selesai
                setTimeout(() => {
                    introScreen.style.opacity = '0';
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                        if(mainContent) mainContent.classList.remove('hidden'); 
                        
                        // FIX: PUTAR MUSIK OTOMATIS SETELAH INTRO SELESAI
                        if (bgm && bgm.paused) {
                            bgm.play().catch(error => {
                                // Gagal Autoplay (browser memblokir)
                                console.log("Autoplay blocked. User must interact.");
                            });
                        }
                    }, 500); 
                }, 1500);
            }
        }
        typeIntro();
    } else {
        // Jika tidak ada intro, pastikan main content tampil dan musik jalan
        if(mainContent) mainContent.classList.remove('hidden');
        if (bgm && bgm.paused) {
            bgm.play().catch(error => {});
        }
    }
}

// BGM Toggle
document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    const bgmToggle = document.getElementById('bgm-toggle');

    if (bgm && bgmToggle) {
        bgmToggle.addEventListener('click', () => {
            if (bgm.paused) {
                bgm.play().then(() => {
                    bgmToggle.innerHTML = '🔊';
                }).catch(error => {
                    // Autoplay diblokir setelah diklik
                    bgmToggle.innerHTML = '🔇';
                });
            } else {
                bgm.pause();
                bgmToggle.innerHTML = '🔇';
            }
        });
    }
});


// -----------------------------------------------------------------
// C. LOGOUT FUNCTION
// -----------------------------------------------------------------

function logout() {
    if (confirm('Yakin ingin keluar, Sayang? 🥺')) {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem('user_role');
        // FIX: Menggunakan replace()
        window.location.replace(LOGIN_PAGE);
    }
}

// -----------------------------------------------------------------
// D. INITIALIZATION
// -----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Countdown & Days Count
    if (document.getElementById('daysCount')) {
        updateDaysCount();
        updateAnniversaryCountdown();
        timerInterval = setInterval(updateAnniversaryCountdown, 1000);
    }

    // 2. Setup Logout Button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // 3. Mulai Intro & Musik
    startIntroSequence();
});
