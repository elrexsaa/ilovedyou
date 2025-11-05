document.addEventListener('DOMContentLoaded', () => {

    // Hanya inisialisasi jika kita berada di halaman chatfav.html
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'chatfav.html') {
        initFavChatApp();
    }
});

// Simulasi Data Pesan Favorit (Ambil dari chat_data.json, tapi hanya yang penting)
// NOTE: Pada implementasi nyata, ini harus diambil dari server. Di sini kita hardcode ID yang ingin di-fav.
const FAVORITE_MESSAGE_IDS = [2, 3, 6]; 
const SENDER_PROFILES = {
    elga: 'profile/elga.JPG',
    nikita: 'profile/nikita.jpg'
};


function initFavChatApp() {
    const container = document.getElementById('fav-messages-container');
    container.innerHTML = ''; // Kosongkan placeholder

    // 1. Ambil data chat dari JSON
    fetch('data/chat_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal memuat data chat. Pastikan data/chat_data.json ada.');
            }
            return response.json();
        })
        .then(allMessages => {
            // Filter hanya pesan yang ada di daftar favorit
            const favMessages = allMessages.filter(msg => FAVORITE_MESSAGE_IDS.includes(msg.id));
            
            if (favMessages.length === 0) {
                container.innerHTML = `<div class="card info-card"><p>Belum ada pesan yang ditandai sebagai favorit. 😥</p></div>`;
                return;
            }
            
            // 2. Render dan Animasi
            renderFavMessages(favMessages, container);
        })
        .catch(error => {
            container.innerHTML = `<div class="card info-card" style="color: red;"><p>Error Memuat: ${error.message}</p></div>`;
            console.error('Fetch Error:', error);
        });
}


function renderFavMessages(messages, container) {
    messages.forEach((msg, index) => {
        const isUser = msg.sender === 'elga';
        const senderName = msg.sender === 'elga' ? 'Kamu' : 'Nikita';
        const senderProfile = SENDER_PROFILES[msg.sender];
        
        // Buat elemen card utama
        const card = document.createElement('div');
        card.className = `fav-message-card ${msg.sender}`;
        
        // Konten Pesan Favorit (Sama seperti logika di chat.js)
        let messageContentHTML = '';
        if (msg.type === 'image') {
            messageContentHTML = `<img src="${msg.content}" alt="Chat Photo" class="message-image">`;
            if (msg.caption) messageContentHTML += `<p class="caption">${msg.caption}</p>`;
        } else if (msg.type === 'sticker') {
            messageContentHTML = `<img src="${msg.content}" alt="Sticker" class="message-sticker">`;
        } else {
            messageContentHTML = `<span class="message-text">${msg.content}</span>`;
        }

        // Susunan Card
        card.innerHTML = `
            <div class="fav-message-header">
                <div class="sender-info">
                    <img src="${senderProfile}" alt="${senderName}" class="sender-profile">
                    <span class="sender-name">${senderName}</span>
                    <span>• ${msg.time}</span>
                </div>
                <i class="bi bi-star-fill star-icon" title="Pesan Favorit"></i>
            </div>
            
            <div class="fav-message-content">
                ${messageContentHTML}
            </div>
            
            <div class="fav-message-footer">
                Diambil dari Chat Elga & Nikita
            </div>
        `;
        
        container.appendChild(card);
        
        // Terapkan animasi staggered
        setTimeout(() => {
            card.classList.add('visible');
        }, 150 * index); // Setiap pesan muncul 150ms setelah pesan sebelumnya
    });
}
