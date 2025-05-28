import { 
    getConnected, 
    getCurrentUsername, 
    setCurrentUsername, 
    sendMessage,
    addMessage 
} from './connection.js';

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const usernameInput = document.getElementById('usernameInput');
    const loginBtn = document.getElementById('loginBtn');
    const loginSection = document.getElementById('login-section');
    const chatSection = document.getElementById('chat-section');
    const usernameDisplay = document.getElementById('username-display');
    const messagesContainer = document.getElementById('messages');

    // Manejar login
    loginBtn.addEventListener('click', handleLogin);
    usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });

    function handleLogin() {
        const username = usernameInput.value.trim();
        
        if (!username) {
            alert('Por favor ingresa tu nombre de usuario');
            usernameInput.focus();
            return;
        }

        setCurrentUsername(username);
        usernameDisplay.textContent = username;
        loginSection.classList.add('d-none');
        chatSection.classList.remove('d-none');
        messageInput.focus();
    }

    // Manejar envío de mensajes
    sendBtn.addEventListener('click', sendChatMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    function sendChatMessage() {
        const text = messageInput.value.trim();
        
        if (!text) {
            messageInput.focus();
            return;
        }

        const message = {
            username: getCurrentUsername(),
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toLocaleDateString()
        };

        if (sendMessage(message)) {
            messageInput.value = '';
        }
    }

    // Función para agregar mensajes (similar a tu imagen)
    function addMessageToUI(username, text, timestamp, isSent, date) {
        // Verificar si necesitamos agregar un separador de fecha
        const lastMessageDate = messagesContainer.lastElementChild?.dataset.date;
        if (lastMessageDate !== date) {
            const dateSeparator = document.createElement('div');
            dateSeparator.className = 'date-separator';
            dateSeparator.textContent = formatDateHeader(date);
            messagesContainer.appendChild(dateSeparator);
        }

        const messageElement = document.createElement('div');
        messageElement.className = `message ${isSent ? 'message-sent' : 'message-received'}`;
        messageElement.dataset.date = date;
        
        messageElement.innerHTML = `
            <div class="message-header">
                ${isSent ? `<span class="message-username">${username}</span>` : ''}
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-content">${text}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function formatDateHeader(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('es-ES', options);
    }
});