document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStyle = document.getElementById('theme-style');
    const icon = themeToggle.querySelector('i');
    
    // Verificar preferencia del usuario
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema guardado o preferencia del sistema
    if (savedTheme) {
        document.body.className = savedTheme + '-theme';
        updateIcon(savedTheme);
    } else {
        const initialTheme = prefersDark ? 'dark' : 'light';
        document.body.className = initialTheme + '-theme';
        updateIcon(initialTheme);
    }
    
    // Manejar el botón de cambio de tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.className = newTheme + '-theme';
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
    
    function updateIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('bi-moon-fill');
            icon.classList.add('bi-sun-fill');
        } else {
            icon.classList.remove('bi-sun-fill');
            icon.classList.add('bi-moon-fill');
        }
    }
});