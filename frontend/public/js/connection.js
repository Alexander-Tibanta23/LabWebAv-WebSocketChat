let ws;
let _connected = false;
let _currentUsername = '';

function connect() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${location.host}`);

    ws.onopen = () => {
        _connected = true;
        updateStatus('Conectado', 'success');
        document.getElementById('sendBtn').disabled = false;
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (document.getElementById('chat-section').classList.contains('d-none') === false) {
            addMessage(msg.username, msg.text, msg.timestamp, msg.username === _currentUsername);
        }
    };

    ws.onclose = () => {
        _connected = false;
        updateStatus('Desconectado - Intentando reconectar...', 'danger');
        document.getElementById('sendBtn').disabled = true;
        setTimeout(connect, 3000);
    };

    ws.onerror = (error) => {
        console.error('Error WebSocket:', error);
    };
}

function updateStatus(text, type) {
    const statusElement = document.getElementById('status');
    statusElement.textContent = text;
    statusElement.className = type === 'success' ? 'text-success' : 'text-danger';
}

function addMessage(username, text, timestamp, isSent) {
    const messagesContainer = document.getElementById('messages');
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

function sendMessage(message) {
    if (!_connected) {
        alert('No hay conexión al servidor');
        return false;
    }
    ws.send(JSON.stringify(message));
    return true;
}

function setCurrentUsername(username) {
    _currentUsername = username;
}

function getCurrentUsername() {
    return _currentUsername;
}

function getConnected() {
    return _connected;
}

// Initialize connection when loaded
document.addEventListener('DOMContentLoaded', () => {
    connect();
});

// Export functions
export {
    getConnected,
    getCurrentUsername,
    setCurrentUsername,
    sendMessage,
    addMessage
};