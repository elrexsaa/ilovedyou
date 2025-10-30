/* === LOGIKA UTAMA WEBSITE (SETELAH LOGIN) === */

// 1. --- PERLINDUNGAN HALAMAN (SECURITY) ---
// Ini harus dijalankan pertama kali
document.addEventListener('DOMContentLoaded', () => {

    // Cek apakah status 'isLoggedIn' ada di session storage
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        // Jika tidak ada (belum login)
        alert('Akses Ditolak! Silakan login terlebih dahulu.');
        // Tendang kembali ke halaman login
        window.location.href = 'index.html';
    } else {
        // Jika berhasil login, jalankan semua fungsi utama
        initMainPage();
    }
});


// Fungsi utama yang dijalankan setelah login terverifikasi
function initMainPage() {
    
    // 2. --- LOGIKA COUNTDOWN ANNIVERSARY ---
    // PENTING: Target tanggal jadian
    // Format: Bulan Nama, Tanggal, Tahun HH:MM:SS
    // Karena tanggal jadianmu 01 Nov 2024, kita akan hitung
    // mundur ke Anniv pertama di 01 Nov 2025.
    const annivDate = new Date("November 1, 2025 00:00:00").getTime();

    const countdownElement = document.getElementById('countdown');
    
    // Perbarui countdown setiap 1 detik
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = annivDate - now;

        // Perhitungan waktu
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Tampilkan di HTML (Kita akan buat elemen-elemen ini di dash.html)
        if (countdownElement) {
            document.getElementById('days').innerText = String(days).padStart(2, '0');
            document.getElementById('hours').innerText = String(hours).padStart(2, '0');
            document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
            document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
        }

        // Jika waktu habis (Hari Anniv!)
        if (distance < 0) {
            clearInterval(timer);
            if (countdownElement) {
                countdownElement.innerHTML = "<h2>💖 Happy Anniversary, Nikita! 💖</h2>";
            }
        }
    }, 1000);


    // 3. --- LOGIKA MUSIK LATAR OTOMATIS ---
    
    // Buat elemen audio
    let bgMusic = document.getElementById('background-music');
    if (!bgMusic) {
        bgMusic = document.createElement('audio');
        bgMusic.id = 'background-music';
        // --- GANTI NAMA FILE MUSIK DI SINI ---
        bgMusic.src = 'audio.mp3'; 
        bgMusic.loop = true;
        bgMusic.volume = 0.3; // Atur volume (0.0 - 1.0)
        document.body.appendChild(bgMusic);
    }

    // Coba mainkan musik
    // Browser modern memblokir autoplay, tapi karena user
    // baru saja mengklik "Login", ini dihitung sebagai interaksi.
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Gagal autoplay, mungkin user perlu klik sekali lagi
            console.warn("Autoplay musik gagal. Perlu interaksi user di halaman ini.");
            // Kita bisa tambahkan tombol "Play Music" jika perlu
        });
    }

    // 4. --- LOGIKA NAVIGASI AKTIF ---
    // (Fungsi ini akan menyorot menu yang sedang aktif)
    const navLinks = document.querySelectorAll('.nav-link'); // Kita akan buat class ini di dash.html
    const currentPage = window.location.pathname.split('/').pop(); // Mendapatkan nama file (cth: "dash.html")

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active'); // Tambahkan class 'active'
        }
    });
}
