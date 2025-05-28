let ws;
let connected = false;
let currentUsername = '';

function connect() {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    ws = new WebSocket(`${protocol}//${location.host}`);

    ws.onopen = () => {
        connected = true;
        updateStatus('Conectado', 'success');
        document.getElementById('sendBtn').disabled = false;
    };

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        // Solo mostrar mensajes si el usuario está en el chat
        if (document.getElementById('chat-section').classList.contains('d-none') === false) {
            addMessage(msg.username, msg.text, msg.timestamp, msg.username === currentUsername);
        }
    };

    ws.onclose = () => {
        connected = false;
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

function sendMessage(message) {
    if (!connected) {
        alert('No hay conexión al servidor');
        return false;
    }

    ws.send(JSON.stringify(message));
    return true;
}

// Inicializar conexión al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    connect();
});

// Exportar funciones necesarias para otros archivos
export { connected, currentUsername, sendMessage };