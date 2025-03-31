// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Aquí puedes agregar cualquier funcionalidad adicional que necesites
    console.log('Página cargada correctamente');
    
    // Ejemplo: Agregar evento de clic a los botones "Conocer más"
    const buttons = document.querySelectorAll('.pet-card button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para mostrar más información
            console.log('Mostrar más información sobre la mascota');
        });
    });
});