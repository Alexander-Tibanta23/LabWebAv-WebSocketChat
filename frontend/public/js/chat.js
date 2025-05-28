import { connected, currentUsername, sendMessage } from './connection.js';

document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const usernameInput = document.getElementById('usernameInput');
    const loginBtn = document.getElementById('loginBtn');
    const loginSection = document.getElementById('login-section');
    const chatSection = document.getElementById('chat-section');
    const usernameDisplay = document.getElementById('username-display');

    // Manejar el login
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

        currentUsername = username;
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
            username: currentUsername,
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        if (sendMessage(message)) {
            addMessage(message.username, message.text, message.timestamp, true);
            messageInput.value = '';
        }
    }

    function addMessage(username, text, timestamp, isSent) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${isSent ? 'message-sent' : 'message-received'}`;
        
        messageElement.innerHTML = `
            <div class="message-username">${username}</div>
            <p class="message-text">${text}</p>
            <div class="message-time">${timestamp}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});