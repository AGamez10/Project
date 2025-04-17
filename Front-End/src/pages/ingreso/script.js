const correo = document.getElementById('correo');

correo.addEventListener('input', function() {
    if (!correo.value.includes('@')) {
        correo.setCustomValidity('Ingrese un correo electrónico válido.');
    } else {
        correo.setCustomValidity('');
    }
});