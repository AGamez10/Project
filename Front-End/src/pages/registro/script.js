particlesJS.load('particles-js', 'particles.json', function() {
});

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const button = document.querySelector('button[type="submit"]');
    // Envío de formulario
    setTimeout(() => {
        alert('Registro exitoso');
        button.innerHTML = 'Completar registro';
        button.disabled = false; // Habilita el botón después del envío
    }, 2000); // Retraso de 2 segundos
});

const nombre = document.getElementById('nombre');
const correo = document.getElementById('correo');
const clave = document.getElementById('clave');

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

clave.addEventListener('input', function() {
    if (clave.value.length < 6) {
        clave.setCustomValidity('La contraseña debe tener al menos 6 caracteres.');
    } else {
        clave.setCustomValidity('');
    }
});