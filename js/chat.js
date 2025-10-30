document.addEventListener('DOMContentLoaded', () => {

    // Hanya inisialisasi chat jika kita berada di halaman chat.html
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'chat.html') {
        initChatApp();
    }
});

// Kunci Local Storage untuk pesan yang dihapus
const DELETED_MESSAGES_KEY = 'deleted_chat_ids';
// ID Pengguna (Elga adalah pengirim/milikmu)
const USER_SENDER_ID = 'elga'; 

// Load status pesan yang sudah dihapus dari Local Storage
function getDeletedMessages() {
    const deletedIds = localStorage.getItem(DELETED_MESSAGES_KEY);
    return deletedIds ? JSON.parse(deletedIds) : [];
}

// Tambahkan ID pesan ke Local Storage
function addDeletedMessage(id) {
    const deletedIds = getDeletedMessages();
    if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem(DELETED_MESSAGES_KEY, JSON.stringify(deletedIds));
    }
}


function initChatApp() {
    const chatContainer = document.getElementById('chat-messages-container');
    const deletedIds = getDeletedMessages();

    // 1. Ambil data chat dari JSON
    fetch('data/chat_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Gagal memuat data chat. Pastikan data/chat_data.json ada.');
            }
            return response.json();
        })
        .then(messages => {
            renderMessages(messages, chatContainer, deletedIds);
        })
        .catch(error => {
            chatContainer.innerHTML = `<p style="color: red; padding: 20px;">Error: ${error.message}</p>`;
            console.error('Fetch Error:', error);
        });

    // 2. FUNGSI RENDER PESAN
    function renderMessages(messages, container, deletedIds) {
        container.innerHTML = ''; // Kosongkan kontainer
        
        messages.forEach(msg => {
            const isDeleted = deletedIds.includes(msg.id);
            const isUser = msg.sender === USER_SENDER_ID;
            
            const bubble = document.createElement('div');
            bubble.className = `message-bubble ${msg.sender}`;
            bubble.setAttribute('data-id', msg.id);

            const contentHTML = isDeleted ? generateDeletedContent() : generateMessageContent(msg);

            const statusHTML = isUser ? generateStatus(isUser) : '';

            // Gabungkan konten utama dan waktu/status
            bubble.innerHTML = `
                <div class="message-text ${isDeleted ? 'deleted' : ''} ${msg.type}">
                    ${contentHTML}
                    <div class="message-time-status">
                        <span class="message-time">${msg.time}</span>
                        ${statusHTML}
                    </div>
                </div>
            `;
            container.appendChild(bubble);

            // Tambahkan event listener untuk menghapus pesan (Hanya pesan Elga)
            if (isUser && !isDeleted) {
                bubble.addEventListener('contextmenu', (e) => handleRightClick(e, msg.id, bubble));
            }
        });

        // Gulir ke bawah setelah pesan dirender
        container.scrollTop = container.scrollHeight;
    }


    // 3. FUNGSI GENERATE KONTEN PESAN
    function generateMessageContent(msg) {
        if (msg.type === 'image') {
            return `
                <div class="message-content">
                    <img src="${msg.content}" alt="Chat Photo">
                    ${msg.caption ? `<p class="caption">${msg.caption}</p>` : ''}
                </div>
            `;
        } else if (msg.type === 'sticker') {
            return `
                <div class="message-content">
                    <img src="${msg.content}" alt="Sticker" style="width: 150px; height: auto;">
                </div>
            `;
        } else { // type: 'text'
            return `<div class="message-content">${msg.content}</div>`;
        }
    }

    function generateDeletedContent() {
        return `<div class="message-content"><i class="bi bi-slash-circle deleted-icon"></i> Pesan ini telah dihapus</div>`;
    }

    function generateStatus(isUser) {
        if (isUser) {
            // Simulasi centang dua (dibaca)
            return `<span class="message-status"><i class="bi bi-check-all"></i></span>`;
        }
        return '';
    }

    // 4. LOGIKA HAPUS PESAN (Context Menu Simulasi)
    function handleRightClick(e, msgId, bubbleElement) {
        e.preventDefault(); 
        
        if (confirm("Yakin ingin menghapus pesan ini (simulasi: Hapus untuk Semua Orang)?")) {
            addDeletedMessage(msgId);
            
            // Ganti tampilan gelembung secara instan
            const status = bubbleElement.querySelector('.message-time-status');
            const content = bubbleElement.querySelector('.message-content');
            
            if (status) status.remove();
            if (content) content.parentNode.innerHTML = generateDeletedContent();
            
            bubbleElement.classList.add('deleted');
            bubbleElement.removeEventListener('contextmenu', handleRightClick); // Hapus listener setelah dihapus
        }
    }
}
