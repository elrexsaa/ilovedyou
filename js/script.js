/* === LOGIKA UTAMA WEBSITE (SETELAH LOGIN) === */

// 1. --- PERLINDUNGAN HALAMAN (SECURITY) ---
document.addEventListener('DOMContentLoaded', () => {

    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        // Mencegah penyusup
        alert('Akses Ditolak! Silakan login terlebih dahulu.');
        window.location.href = 'index.html';
    } else {
        // Jika berhasil login, jalankan semua fungsi utama
        initMainPage();
    }
});


// Fungsi utama yang dijalankan setelah login terverifikasi
function initMainPage() {
    
    // 2. --- LOGIKA COUNTDOWN ANNIVERSARY ---
    const annivDate = new Date("November 1, 2025 00:00:00").getTime();
    const countdownElement = document.getElementById('countdown');
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = annivDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (countdownElement) {
            // Pastikan elemen ditemukan sebelum diisi
            const d = document.getElementById('days');
            const h = document.getElementById('hours');
            const m = document.getElementById('minutes');
            const s = document.getElementById('seconds');
            
            if(d) d.innerText = String(days).padStart(2, '0');
            if(h) h.innerText = String(hours).padStart(2, '0');
            if(m) m.innerText = String(minutes).padStart(2, '0');
            if(s) s.innerText = String(seconds).padStart(2, '0');
        }

        if (distance < 0) {
            clearInterval(timer);
            if (countdownElement) {
                countdownElement.innerHTML = "<h2>💖 Happy Anniversary, Nikita! 💖</h2>";
            }
        }
    }, 1000);


    // 3. --- LOGIKA MUSIK LATAR OTOMATIS ---
    let bgMusic = document.getElementById('background-music');
    if (!bgMusic) {
        bgMusic = document.createElement('audio');
        bgMusic.id = 'background-music';
        bgMusic.src = 'audio.mp3'; // PASTIKAN FILE INI ADA!
        bgMusic.loop = true;
        bgMusic.volume = 0.3; 
        document.body.appendChild(bgMusic);
    }
    bgMusic.play().catch(error => {
        console.warn("Autoplay musik gagal. Perlu interaksi user.");
    });


    // 4. --- LOGIKA NAVIGASI AKTIF ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 5. --- BARU: LOGIKA LOGOUT ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Yakin ingin keluar?')) {
                // Hapus status login
                sessionStorage.removeItem('isLoggedIn');
                
                // Hentikan musik
                if (bgMusic) {
                    bgMusic.pause();
                }
                
                // Redirect ke halaman login
                window.location.href = 'index.html';
            }
        });

            // ... (kode dari LOGIKA LOGOUT) ...

    // 6. --- BARU: LOGIKA ANIMASI SCROLL REVEAL UNTUK TIMELINE ---
    const revealTimelineItems = () => {
        const items = document.querySelectorAll('.reveal-item');
        const triggerBottom = window.innerHeight * 0.85; // 85% dari tinggi viewport

        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('visible');
            } else {
                item.classList.remove('visible'); // Opsional: hapus saat scroll ke atas
            }
        });

            // ... (Logika revealTimelineItems dan window.addEventListener('scroll') sebelumnya)

    // 7. --- BARU: LOGIKA IMAGE SLIDER (FADE) UNTUK TENTANG.HTML ---
    function initImageSlider() {
        const images = document.querySelectorAll('.image-slider .slider-image');
        if (images.length === 0) return; // Hentikan jika tidak ada gambar

        let currentIndex = 0;
        
        // Fungsi untuk menampilkan gambar berikutnya
        function nextImage() {
            // Hapus kelas 'active' dari gambar saat ini
            images[currentIndex].classList.remove('active');
            
            // Hitung indeks gambar berikutnya (looping)
            currentIndex = (currentIndex + 1) % images.length;
            
            // Tambahkan kelas 'active' ke gambar berikutnya
            images[currentIndex].classList.add('active');
        }

        // Atur interval untuk mengganti gambar setiap 4 detik
        setInterval(nextImage, 4000); // Ganti setiap 4000ms (4 detik)
    }

    // Panggil fungsi slider saat halaman dimuat
    initImageSlider(); 
} // <--- PASTIKAN KURUNG TUTUP INI ADALAH AKHIR DARI initMainPage()

    };

    // Jalankan saat load dan saat scroll
    window.addEventListener('scroll', revealTimelineItems);
    revealTimelineItems();// Jalankan sekali saat halaman dimuat

    }
}
