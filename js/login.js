// Menunggu semua elemen halaman dimuat
document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    // BARU: Pindahkan variabel ini ke atas agar bisa diakses oleh fungsi lain
    const passwordInput = document.getElementById('password'); 
    const togglePassword = document.getElementById('toggle-password');

    // 1. --- LOGIKA LOGIN ---
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form terkirim (reload)

        const passwordValue = passwordInput.value;

        // --- PENTING! GANTI PASSWORD DI SINI ---
        // Ganti '011124' dengan password rahasia kalian
        const correctPassword = '011124'; 

        if (passwordValue === correctPassword) {
            // Jika Benar
            loginSuccess();
        } else {
            // Jika Salah
            loginError();
        }
    });

    function loginSuccess() {
        // 1. Simpan status "sudah login" di browser
        // Ini adalah "kunci" agar halaman lain bisa dibuka
        sessionStorage.setItem('isLoggedIn', 'true');

        // 2. Tampilkan popup sukses
        // (Sengaja dibuat dua popup agar lebih manis)
        showToast('Hai nikitaa🙋🏻‍♂️', 'success');
        
        setTimeout(() => {
            showToast('Selamat datang bu boss🙏🏻', 'success');
        }, 1500); // Popup kedua muncul 1.5 detik setelah popup pertama

        // 3. Tunggu animasi popup selesai, lalu pindah ke halaman dash.html
        setTimeout(() => {
            window.location.href = 'dash.html';
        }, 4000); // Pindah halaman setelah 4 detik
    }

    function loginError() {
        // Tampilkan popup error
        showToast('Password salah, dilarang masuk!', 'error');

        // Goyangkan kotak login (animasi tambahan)
        const loginBox = document.querySelector('.login-box');
        loginBox.classList.add('shake');
        
        // Hapus animasi shake setelah selesai
        setTimeout(() => {
            loginBox.classList.remove('shake');
        }, 500);
    }


    // 2. --- FUNGSI UNTUK MENAMPILKAN POPUP (TOAST) ---
    function showToast(message, type) {
        const container = document.getElementById('toast-container');
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`; // Cth: 'toast success' atau 'toast error'
        toast.innerText = message;

        container.appendChild(toast);

        // Hapus toast setelah animasinya selesai (4 detik)
        setTimeout(() => {
            toast.remove();
        }, 4000);
    }

    // 3. --- CSS UNTUK ANIMASI SHAKE (GOYANG) ---
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        .login-box.shake {
            animation: shake 0.5s ease-in-out;
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-10px); }
            40%, 80% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(styleSheet);


    // 4. --- BARU: LOGIKA UNTUK SHOW/HIDE PASSWORD ---
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            // Cek tipe input saat ini
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Ganti icon matanya
            if (type === 'password') {
                // Jika jadi password (tertutup)
                togglePassword.classList.remove('bi-eye-fill');
                togglePassword.classList.add('bi-eye-slash-fill');
            } else {
                // Jika jadi text (terlihat)
                togglePassword.classList.remove('bi-eye-slash-fill');
                togglePassword.classList.add('bi-eye-fill');
            }
        });
    }

});
