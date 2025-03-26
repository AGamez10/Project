particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Partículas cargadas');
});

const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');

nombre.addEventListener('input', function() {
    if (nombre.value.length < 3) {
        nombre.setCustomValidity('El nombre debe tener al menos 3 caracteres.');
    } else {
        nombre.setCustomValidity('');
    }
});

correo.addEventListener('input', function() {
    if (!correo.value.includes('@')) {
        correo.setCustomValidity('Ingrese un correo electrónico válido.');
    } else {
        correo.setCustomValidity('');
    }
});