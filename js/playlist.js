document.addEventListener('DOMContentLoaded', () => {

    // Hanya inisialisasi player jika kita berada di halaman playlist.html
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'playlist.html') {
        initMusicPlayer();
    }
});


// 1. DAFTAR LAGU
const allMusic = [
    {
        name: "Nina",
        artist: ".Feast",
        src: "sound/track_1.mp3", // GANTI PATH INI
        cover: "images/cover_1.jpg" // GANTI PATH INI
    },
    {
        name: "All Of Me",
        artist: "Jhon Legend",
        src: "sound/track_2.mp3", // GANTI PATH INI
        cover: "images/cover_2.jpg" // GANTI PATH INI
    },
    {
        name: "Kenangan Manis",
        artist: "Pamungkas",
        src: "sound/track_3.mp3", // GANTI PATH INI
        cover: "images/cover_3.jpg" // GANTI PATH INI
    }
    // Tambahkan lebih banyak lagu di sini!
];

// 2. ELEMEN DOM
const musicAudio = new Audio();
let musicIndex = 0;
let isPlaying = false;
let isShuffled = false;
let originalOrder = [...allMusic];


function initMusicPlayer() {
    // ⚠️ Nonaktifkan musik latar (bgMusic) dari script.js jika ada
    const mainBgMusic = document.getElementById('background-music');
    if (mainBgMusic) {
        mainBgMusic.pause();
        mainBgMusic.currentTime = 0;
    }
    
    // Ambil elemen dari HTML
    const playPauseBtn = document.getElementById('play-pause-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressArea = document.getElementById('progress-area');
    const coverWrapper = document.querySelector('.album-cover-wrapper');

    // Tampilkan lagu pertama saat inisialisasi
    loadMusic(musicIndex);


    // 3. FUNGSI MUAT LAGU
    function loadMusic(index) {
        const currentTrack = allMusic[index];
        musicAudio.src = currentTrack.src;
        musicAudio.load(); // Load audio baru

        document.getElementById('track-title').innerText = currentTrack.name;
        document.getElementById('track-artist').innerText = currentTrack.artist;
        document.getElementById('track-cover').src = currentTrack.cover;
        document.getElementById('current-track-index').innerText = index + 1;
        document.getElementById('total-tracks').innerText = allMusic.length;

        // Atur icon Play/Pause sesuai status
        if (isPlaying) {
            playMusic();
        } else {
            pauseMusic();
        }
    }


    // 4. KONTROL UTAMA
    function playMusic() {
        isPlaying = true;
        musicAudio.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        coverWrapper.classList.add('playing');
    }

    function pauseMusic() {
        isPlaying = false;
        musicAudio.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        coverWrapper.classList.remove('playing');
    }

    function nextMusic() {
        musicIndex = (musicIndex + 1) % allMusic.length;
        loadMusic(musicIndex);
        playMusic();
    }

    function prevMusic() {
        musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length;
        loadMusic(musicIndex);
        playMusic();
    }


    // 5. EVENT LISTENERS KONTROL
    playPauseBtn.addEventListener('click', () => {
        isPlaying ? pauseMusic() : playMusic();
    });
    nextBtn.addEventListener('click', nextMusic);
    prevBtn.addEventListener('click', prevMusic);
    musicAudio.addEventListener('ended', nextMusic); 


    // 6. PROGRESS BAR DAN DURASI
    musicAudio.addEventListener('loadedmetadata', () => {
        // Update total durasi lagu
        const totalDurationElement = document.getElementById('total-duration');
        const duration = musicAudio.duration;
        const totalMin = Math.floor(duration / 60);
        const totalSec = Math.floor(duration % 60).toString().padStart(2, '0');
        totalDurationElement.innerText = `${totalMin}:${totalSec}`;
    });

    musicAudio.addEventListener('timeupdate', (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        let progressWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${progressWidth}%`;

        // Update waktu saat ini
        const currentTimeElement = document.getElementById('current-time');
        const currentMin = Math.floor(currentTime / 60);
        const currentSec = Math.floor(currentTime % 60).toString().padStart(2, '0');
        currentTimeElement.innerText = `${currentMin}:${currentSec}`;
    });

    progressArea.addEventListener('click', (e) => {
        const progressWidthVal = progressArea.clientWidth;
        const clickedOffsetX = e.offsetX;
        const musicDuration = musicAudio.duration;
        
        // Pindah lagu ke posisi yang diklik
        musicAudio.currentTime = (clickedOffsetX / progressWidthVal) * musicDuration;
        playMusic(); 
    });


    // 7. FUNGSI SHUFFLE
    shuffleBtn.addEventListener('click', () => {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
        
        if (isShuffled) {
            // Lakukan shuffle
            let newMusic = [...originalOrder]; // Ambil salinan original
            for (let i = newMusic.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newMusic[i], newMusic[j]] = [newMusic[j], newMusic[i]];
            }
            allMusic = newMusic;
        } else {
            // Kembalikan ke urutan awal
            allMusic = originalOrder;
        }

        // Muat ulang lagu yang sedang dimainkan (jika masih ada di list)
        // Cari index lagu yang sedang dimainkan di list yang baru
        const currentName = document.getElementById('track-title').innerText;
        musicIndex = allMusic.findIndex(track => track.name === currentName);
        
        // Pastikan index ditemukan, jika tidak, kembali ke 0
        if (musicIndex === -1) musicIndex = 0;
        
        loadMusic(musicIndex);
        playMusic();
    });

    // 8. FUNGSI VOLUME (Ikon saja, tanpa slider)
    const volumeBtn = document.getElementById('volume-btn');
    volumeBtn.addEventListener('click', () => {
        if (musicAudio.volume > 0.5) {
            musicAudio.volume = 0; // Mute
            volumeBtn.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
        } else {
            musicAudio.volume = 0.8; // Set volume standar
            volumeBtn.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
        }
    });

}
