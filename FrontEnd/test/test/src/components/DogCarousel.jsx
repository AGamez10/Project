import { useState } from 'react';

const DogCarousel = () => {
  // Datos de los perros para el carrusel
  const dogs = [
    {
      id: 1,
      name: 'Max',
      breed: 'Labrador Mix',
      age: '2 años',
      size: 'Mediano',
      gender: 'Macho',
      description: 'Juguetón y cariñoso, ideal para familias con niños. Vacunado y esterilizado.',
      status: 'Disponible',
      image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9'
    },
    {
      id: 2,
      name: 'Lola',
      breed: 'Golden Retriever',
      age: '5 años',
      size: 'Grande',
      gender: 'Hembra',
      description: 'Tranquila y paciente, perfecta para terapia. Excelente con niños.',
      status: 'Disponible',
      image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19'
    },
    {
      id: 3,
      name: 'Toby',
      breed: 'Beagle',
      age: '4 meses',
      size: 'Pequeño',
      gender: 'Macho',
      description: 'Cachorro juguetón y curioso, en proceso de entrenamiento básico.',
      status: 'Disponible',
      image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2'
    }
  ];

  // Estado para controlar el índice del perro actual en el carrusel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para ir al perro anterior
  const prevDog = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? dogs.length - 1 : prevIndex - 1
    );
  };

  // Función para ir al perro siguiente
  const nextDog = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === dogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Perro actual a mostrar
  const currentDog = dogs[currentIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto my-8 overflow-hidden">
      {/* Fondo con imagen principal */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-lg">
        <img 
          src={currentDog.image} 
          alt={currentDog.name}
          className="w-full h-full object-cover brightness-75"
        />
        
        {/* Contenido superpuesto */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
          <h2 className="text-5xl font-bold mb-4">{currentDog.name.toUpperCase()}</h2>
          <p className="text-xl max-w-md mb-6">
            {currentDog.description}
          </p>
          <button className="bg-white text-gray-800 px-6 py-2 rounded-md w-max hover:bg-gray-100 transition-colors">
            Ver más
          </button>
        </div>

        {/* Imágenes secundarias a la derecha */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4">
          {dogs.map((dog, index) => (
            index !== currentIndex && index < currentIndex + 2 && (
              <div 
                key={dog.id} 
                className="w-48 h-64 rounded-lg overflow-hidden cursor-pointer shadow-lg"
                onClick={() => setCurrentIndex(index)}
              >
                <img 
                  src={dog.image} 
                  alt={dog.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )
          ))}
        </div>

        {/* Botones de navegación */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
          <button 
            onClick={prevDog}
            className="bg-white/30 backdrop-blur-sm hover:bg-white/50 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            aria-label="Perro anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={nextDog}
            className="bg-white/30 backdrop-blur-sm hover:bg-white/50 w-12 h-12 rounded-full flex items-center justify-center transition-colors"
            aria-label="Perro siguiente"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DogCarousel;