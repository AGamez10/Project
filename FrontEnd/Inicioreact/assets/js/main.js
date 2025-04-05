// main.js
class AdoptaFacilApp {
    constructor() {
        this.searchForm = document.querySelector('.max-w-2xl.mx-auto.bg-white');
        this.petCards = document.querySelectorAll('.pet-card');
        this.categoryCards = document.querySelectorAll('.category-card');
        this.setupEventListeners();
        this.initializeAnimations();
    }

    setupEventListeners() {
        // Setup search functionality with real-time filtering
        if (this.searchForm) {
            const inputs = this.searchForm.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('input', () => this.handleSearch());
            });
            const searchButton = this.searchForm.querySelector('button');
            searchButton.addEventListener('click', (e) => this.handleSearch(e));
        }

        // Setup pet card interactions
        this.petCards.forEach(card => {
            const button = card.querySelector('button');
            if (button) {
                button.addEventListener('click', (e) => this.handlePetCardClick(e, card));
            }
        });
    }

    handleSearch(e) {
        e.preventDefault();
        const breedInput = this.searchForm.querySelector('input[placeholder*="raza"]');
        const locationInput = this.searchForm.querySelector('input[placeholder*="Ciudad"]');

        try {
            const searchData = {
                breed: breedInput ? breedInput.value.trim() : '',
                location: locationInput ? locationInput.value.trim() : ''
            };

            // Filter pet cards based on search criteria
            this.filterPetCards(searchData);
        } catch (error) {
            console.error('Error during search:', error);
        }
    }

    filterPetCards(searchData) {
        this.petCards.forEach(card => {
            const petInfo = Array.from(card.querySelectorAll('p'))
                .map(p => p.textContent.toLowerCase())
                .join(' ');
            const shouldShow = 
                (!searchData.breed || petInfo.includes(searchData.breed.toLowerCase())) &&
                (!searchData.location || petInfo.includes(searchData.location.toLowerCase()));
            
            if (shouldShow) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    handlePetCardClick(e, card) {
        e.preventDefault();
        const petName = card.querySelector('h3').textContent;
        const petInfo = Array.from(card.querySelectorAll('p')).map(p => p.textContent).join(' ');
        const petImage = card.querySelector('img').src;

        // Añadir efecto de pulsación
        card.style.transform = 'scale(0.95)';
        setTimeout(() => card.style.transform = 'scale(1)', 200);

        // Show pet details in a modal
        this.showPetDetails({
            name: petName,
            info: petInfo,
            image: petImage
        });
    }

    showPetDetails(pet) {
        // Crear y mostrar un modal con los detalles de la mascota
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full mx-4 transform transition-all">
                <img src="${pet.image}" alt="${pet.name}" class="w-full h-64 object-cover rounded-lg mb-4">
                <h3 class="text-2xl font-bold mb-2 dark:text-white">${pet.name}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4">${pet.info}</p>
                <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Contactar para adoptar</button>
            </div>
        `;

        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        document.body.appendChild(modal);
    }
}

    initializeAnimations();
        // Configurar animaciones iniciales
        this.petCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.3s ease-in-out';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });

        // Animaciones para las tarjetas de categoría
        this.categoryCards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    


// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdoptaFacilApp();
});