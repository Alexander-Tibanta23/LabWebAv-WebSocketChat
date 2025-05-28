document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Guardar en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') body.classList.add('dark');

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark');
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
        toggleBtn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
    });

    toggleBtn.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
});