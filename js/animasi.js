// =============================================================
// File: love/js/animasi.js
// =============================================================

// -----------------------------------------------------------------
// A. INTRO TYPING ANIMATION (Berjalan di index.html)
// -----------------------------------------------------------------

function startTypingSequence(targetPage) {
    const loadingPage = document.getElementById('loadingPage');
    const typingTextElement = document.getElementById('typingText');
    const loginPage = document.getElementById('loginPage');

    if (!loadingPage || !typingTextElement || !loginPage) return;

    loginPage.hidden = true;
    loadingPage.hidden = false; 
    loadingPage.setAttribute('aria-hidden', 'false');

    typingTextElement.textContent = '';
    const text = 'Memuat Kenangan Romantis & Merapikan Memori...';
    let i = 0;
    const speed = 50; // Kecepatan mengetik

    const t = setInterval(() => {
        if (i < text.length) {
            typingTextElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(t);
            setTimeout(() => {
                window.location.href = targetPage;
            }, 800); 
        }
    }, speed);
}

// -----------------------------------------------------------------
// B. BACKGROUND HEARTS ANIMATION (Berjalan di SEMUA halaman)
// -----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const bgHearts = document.querySelector('.bg-hearts');
    if (!bgHearts) return;

    const numHearts = 15; // Jumlah hati yang jatuh
    
    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Posisi acak di bagian atas layar
        const size = Math.random() * 20 + 10; // Ukuran 10px sampai 30px
        const duration = Math.random() * 10 + 5; // Durasi 5s sampai 15s
        
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        bgHearts.appendChild(heart);
    }
});

// -----------------------------------------------------------------
// C. INTRO TEXT ANIMATION (Berjalan di kenangan.html)
// -----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const introTextDiv = document.getElementById('intro-text');
    const introScreen = document.querySelector('.intro-screen');
    const mainContent = document.querySelector('main');

    // Pastikan kita berada di kenangan.html
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
                // Setelah selesai mengetik, tunggu sebentar lalu hilangkan layar intro
                setTimeout(() => {
                    introScreen.style.opacity = '0';
                    setTimeout(() => {
                        introScreen.style.display = 'none';
                        if(mainContent) mainContent.classList.remove('hidden'); // Tampilkan main content
                    }, 500); // Durasi fade-out
                }, 1500);
            }
        }
        
        // Hanya mulai animasi jika otentikasi sukses
        if (sessionStorage.getItem(AUTH_KEY) === 'true') {
             introScreen.style.display = 'flex';
             typeIntro();
        }
    }
});
