// =============================================================
// File: js/script.js (Logika Utama Website - FIX ANNIVERSARY MUTLAK)
// =============================================================

const AUTH_KEY = 'auth_granted';
const LOGIN_PAGE = 'index.html';
const START_DATE = new Date('2024-08-03T00:00:00'); 
const ANNIVERSARY_DAY = 1;      // Tanggal Hari Jadi (1)
const ANNIVERSARY_MONTH = 10;   // Bulan Hari Jadi (10 = November, karena Januari = 0)


// Fungsi untuk menghitung tanggal hari jadi berikutnya
function getNextAnniversary() {
    const today = new Date();
    // Atur tanggal anniv untuk tahun ini
    let nextAnniv = new Date(today.getFullYear(), ANNIVERSARY_MONTH, ANNIVERSARY_DAY, 0, 0, 0);

    // Jika waktu sekarang sudah melewati waktu anniv tahun ini, atur ke tahun depan
    if (today.getTime() > nextAnniv.getTime()) {
        nextAnniv.setFullYear(today.getFullYear() + 1);
    }
    
    return nextAnniv.getTime();
}

// Fungsi Paling Penting: Cek apakah hari ini SANGAT SPESIFIK Hari H
function isTodayTheAnniversary() {
    const today = new Date();
    // Cek Bulan dan Tanggal secara absolut
    return today.getDate() === ANNIVERSARY_DAY && today.getMonth() === ANNIVERSARY_MONTH;
}


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

let timerInterval;

function updateAnniversaryCountdown() {
    const now = new Date().getTime();
    const ANNIVERSARY_DATE = getNextAnniversary();
    const distance = ANNIVERSARY_DATE - now;
    const countdownElement = document.getElementById("anniversaryCountdown");

    if (!countdownElement) return;

    // *** FIX KRITIS: Jika Hari Ini Adalah Hari H, Tampilkan Animasi ***
    if (isTodayTheAnniversary()) { 
        clearInterval(timerInterval);
        countdownElement.innerHTML = "🎉 **HARI JADI KITA!** 🎉";
        countdownElement.classList.add('anniversary-reached');
        
        showAnniversaryAnimation();
        return;
    }

    if (distance > 0) {
        // Perhitungan waktu normal
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `<span class="countdown-value">${days}</span> Hari : <span class="countdown-value">${hours}</span> Jam : <span class="countdown-value">${minutes}</span> Menit : <span class="countdown-value">${seconds}</span> Detik`;
    } 
}

function showAnniversaryAnimation() {
    const overlay = document.getElementById('anniversary-overlay');
    const mainContent = document.querySelector('main');
    
    if (overlay) {
        if (mainContent) mainContent.hidden = true;
        overlay.hidden = false;
        addConfettiEffect(); 
    }
}

function addConfettiEffect() {
    const overlayContent = document.querySelector('#anniversary-overlay .overlay-content');
    if (overlayContent) {
        overlayContent.querySelectorAll('.confetti').forEach(c => c.remove());
        
        const emojis = ['💖', '🥰', '🐻', '🐰', '💗', '🥳', '😘', '💘'];
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random positioning dan animasi
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${Math.random() * 100}%`;
            confetti.style.transform = `scale(${0.5 + Math.random()})`;
            confetti.style.animation = `fall ${5 + Math.random() * 5}s linear infinite, shake ${0.5 + Math.random()}s infinite alternate`;
            overlayContent.appendChild(confetti);
        }
        
        // Style Confetti ditambahkan satu kali
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.innerHTML = `
                .confetti {
                    position: absolute;
                    font-size: 1.5rem;
                    opacity: 0.8;
                    pointer-events: none;
                }
                @keyframes fall {
                    0% { transform: translateY(-100vh); opacity: 0.5; }
                    100% { transform: translateY(100vh); opacity: 1; }
                }
                @keyframes shake {
                    0% { transform: translateX(0) rotate(0deg); }
                    50% { transform: translateX(5px) rotate(5deg); }
                    100% { transform: translateX(-5px) rotate(-5deg); }
                }
            `;
            document.head.appendChild(style);
        }
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
    const userRoleElement = document.getElementById('userRole');

    // Tampilkan role di header (jika elemen ada)
    if (userRoleElement) {
        const role = sessionStorage.getItem('user_role') || 'Sayang';
        userRoleElement.textContent = (role === 'NIKITA' ? 'Welcome Back, Nikita Sayangku!' : 'Hai, ' + role + '!');
    }

    // Hanya jalankan intro di kenangan.html (introTextDiv ada)
    if (introTextDiv && introScreen) {
        // Cek jika sudah hari H, langsung tampilkan overlay tanpa intro normal
        if (isTodayTheAnniversary()) {
            if(mainContent) mainContent.classList.remove('hidden'); // Tampilkan main sebentar untuk hitungan mundur
            introScreen.style.display = 'none';
            // Biarkan updateAnniversaryCountdown yang memanggil showAnniversaryAnimation()
        } else {
             // Jalankan intro normal
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
                            
                            // FIX AUTOPLAY: PUTAR MUSIK OTOMATIS SETELAH INTRO
                            if (bgm && bgm.paused) {
                                bgm.play().then(() => {
                                    const bgmToggle = document.getElementById('bgm-toggle');
                                    if(bgmToggle) bgmToggle.innerHTML = '🔊'; 
                                    sessionStorage.setItem('bgm_state', 'playing');
                                }).catch(error => {
                                    console.log("Autoplay blocked. User must click.");
                                });
                            }
                        }, 500); 
                    }, 1500);
                }
            }
            typeIntro();
        }
    } else {
        // FIX BLANK PAGE: Untuk halaman konten lain, pastikan main content tampil
        if(mainContent) mainContent.classList.remove('hidden');
        
        // Putar musik jika status BGM 'playing' dari session sebelumnya
        if (bgm && bgm.paused && sessionStorage.getItem('bgm_state') === 'playing') {
             bgm.play().then(() => {
                const bgmToggle = document.getElementById('bgm-toggle');
                if(bgmToggle) bgmToggle.innerHTML = '🔊'; 
            }).catch(error => {});
        }
    }
}

// BGM Toggle & Session Storage
document.addEventListener('DOMContentLoaded', () => {
    const bgm = document.getElementById('bgm');
    const bgmToggle = document.getElementById('bgm-toggle');

    if (bgm && bgmToggle) {
        bgmToggle.addEventListener('click', () => {
            if (bgm.paused) {
                bgm.play().then(() => {
                    bgmToggle.innerHTML = '🔊';
                    sessionStorage.setItem('bgm_state', 'playing');
                }).catch(error => {
                    bgmToggle.innerHTML = '🔇';
                    sessionStorage.setItem('bgm_state', 'paused');
                });
            } else {
                bgm.pause();
                bgmToggle.innerHTML = '🔇';
                sessionStorage.setItem('bgm_state', 'paused');
            }
        });
        
        // Atur tampilan awal tombol
        if (sessionStorage.getItem('bgm_state') === 'playing') {
            if(bgmToggle) bgmToggle.innerHTML = '🔊';
        }
    }
});


// -----------------------------------------------------------------
// C. LOGOUT FUNCTION
// -----------------------------------------------------------------

function logout() {
    if (confirm('Yakin ingin keluar, Sayang? 🥺')) {
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem('user_role');
        sessionStorage.removeItem('bgm_state'); 
        window.location.replace(LOGIN_PAGE);
    }
}

// Global scope agar bisa dipanggil di HTML lain
window.logout = logout; 


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
