document.addEventListener('DOMContentLoaded', function() {
    console.log('Página cargada correctamente');
});

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuBtn');
    const mainMenu = document.getElementById('mainMenu');

    menuBtn.addEventListener('click', function() {
        // Alternar la clase 'hidden' para mostrar/ocultar el menú
        mainMenu.classList.toggle('hidden');
        
        // Cambiar el icono del botón a una "X" cuando el menú está abierto
        const menuIcon = menuBtn.querySelector('svg');
        if(mainMenu.classList.contains('hidden')) {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        } else {
            menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        }
    });
});