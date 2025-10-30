document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password'); 
    const togglePassword = document.getElementById('toggle-password');
    
    // BARU: Variabel untuk Modal
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.querySelector('.modal-content');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    // 1. --- LOGIKA LOGIN ---
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const passwordValue = passwordInput.value;
        const correctPassword = '011124'; // <-- GANTI PASSWORD DI SINI

        if (passwordValue === correctPassword) {
            loginSuccess();
        } else {
            loginError();
        }
    });

    function loginSuccess() {
        // Simpan status login
        sessionStorage.setItem('isLoggedIn', 'true');

        // Tampilkan modal sukses
        showModal(
            'Hai nikitaa🙋🏻‍♂️', 
            'Selamat datang bu boss🙏🏻', 
            'success'
        );
        
        // Pindah ke halaman dash.html setelah 3 detik
        setTimeout(() => {
            window.location.href = 'dash.html';
        }, 3000); // 3 detik
    }

    function loginError() {
        // Tampilkan modal error
        showModal(
            'Password Salah!', 
            'Dilarang masuk!', 
            'error'
        );

        // Goyangkan kotak login (animasi dari CSS lama, masih dipakai)
        const loginBox = document.querySelector('.login-box');
        loginBox.classList.add('shake');
        
        // Hapus animasi shake
        setTimeout(() => {
            loginBox.classList.remove('shake');
        }, 500);

        // "Refresh" (Tutup modal, kosongkan & fokus ulang password)
        setTimeout(() => {
            hideModal();
            passwordInput.value = ''; // Kosongkan field
            passwordInput.focus(); // Fokus ulang ke field
        }, 2500); // 2.5 detik
    }


    // 2. --- FUNGSI BARU UNTUK MODAL ---
    
    function showModal(title, message, type) {
        modalTitle.innerText = title;
        modalMessage.innerText = message;
        // Hapus class lama, tambahkan class baru (cth: .success atau .error)
        modalContent.className = 'modal-content ' + type; 
        
        // Tampilkan modal & blur background
        modalContainer.classList.add('show');
        document.body.classList.add('modal-open');
    }

    function hideModal() {
        // Sembunyikan modal & hilangkan blur background
        modalContainer.classList.remove('show');
        document.body.classList.remove('modal-open');
    }


    // 3. --- CSS UNTUK ANIMASI SHAKE (GOYANG) ---
    // (Ini masih sama, untuk menggoyangkan box jika salah)
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


    // 4. --- LOGIKA UNTUK SHOW/HIDE PASSWORD ---
    // (Ini masih sama)
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            if (type === 'password') {
                togglePassword.classList.remove('bi-eye-fill');
                togglePassword.classList.add('bi-eye-slash-fill');
            } else {
                togglePassword.classList.remove('bi-eye-slash-fill');
                togglePassword.classList.add('bi-eye-fill');
            }
        });
    }

});
