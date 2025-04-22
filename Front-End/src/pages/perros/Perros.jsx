import { useState, useEffect } from 'react';
import PetCard from '../inicio/PetCard';

const Perros = () => {
  useEffect(() => {
    document.title = "Perros en Adopción | AdoptaFácil";
  }, []);

  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // Datos de ejemplo de perros disponibles para adopción
  const perros = [
    {
      name: 'Max',
      breed: 'Labrador Retriever',
      age: '2 años',
      description: 'Juguetón y cariñoso, ideal para familias con niños.',
      imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9'
    },
    {
      name: 'Rocky',
      breed: 'Pastor Alemán',
      age: '3 años',
      description: 'Leal y protector, excelente como perro guardián.',
      imageUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95'
    },
    {
      name: 'Luna',
      breed: 'Golden Retriever',
      age: '1 año',
      description: 'Dulce y sociable, perfecta para familias activas.',
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d'
    },
    {
      name: 'Toby',
      breed: 'Beagle',
      age: '2 años',
      description: 'Curioso y enérgico, le encanta explorar.',
      imageUrl: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530'
    },
    {
      name: 'Bella',
      breed: 'Bulldog Francés',
      age: '4 años',
      description: 'Tranquila y cariñosa, perfecta para apartamentos.',
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
    },
    {
      name: 'Coco',
      breed: 'Chihuahua',
      age: '3 años',
      description: 'Pequeña pero con gran personalidad, muy leal.',
      imageUrl: 'https://images.unsplash.com/photo-1605897472359-85e4b94c703a'
    }
  ];

  // Filtrar perros según la búsqueda y el filtro seleccionado
  const perrosFiltrados = perros.filter(perro => {
    const coincideBusqueda = perro.name.toLowerCase().includes(busqueda.toLowerCase()) || 
                            perro.breed.toLowerCase().includes(busqueda.toLowerCase());
    
    if (filtro === 'todos') return coincideBusqueda;
    if (filtro === 'jovenes') return coincideBusqueda && perro.age.includes('1');
    if (filtro === 'adultos') return coincideBusqueda && (perro.age.includes('2') || perro.age.includes('3'));
    if (filtro === 'mayores') return coincideBusqueda && parseInt(perro.age) >= 4;
    
    return coincideBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      {/* Sección de cabecera con fondo de partículas */}
      <section className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 dark:from-green-600 dark:to-blue-700">
        <div className="container mx-auto text-center relative px-4 z-10">
          <h1 className="text-4xl font-bold mb-6">Perros en Adopción</h1>
          <p className="text-xl mb-8 mx-auto max-w-2xl">Encuentra a tu compañero canino perfecto entre nuestros adorables perros que buscan un hogar amoroso</p>
          
          {/* Barra de búsqueda */}
          <div className="max-w-xl mx-auto bg-white rounded-xl shadow-xl p-2 flex dark:bg-gray-800">
            <input
              type="text"
              placeholder="Buscar por nombre o raza..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-3 rounded-lg focus:outline-none text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-12 z-10 relative">
        {/* Filtros */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setFiltro('todos')} 
            className={`px-6 py-2 rounded-full ${filtro === 'todos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFiltro('jovenes')} 
            className={`px-6 py-2 rounded-full ${filtro === 'jovenes' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            Cachorros (1 año)
          </button>
          <button 
            onClick={() => setFiltro('adultos')} 
            className={`px-6 py-2 rounded-full ${filtro === 'adultos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            Adultos (2-3 años)
          </button>
          <button 
            onClick={() => setFiltro('mayores')} 
            className={`px-6 py-2 rounded-full ${filtro === 'mayores' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}
          >
            Mayores (4+ años)
          </button>
        </div>

        {/* Grid de tarjetas de perros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
          {perrosFiltrados.length > 0 ? (
            perrosFiltrados.map((perro, index) => (
              <PetCard
                key={index}
                name={perro.name}
                breed={perro.breed}
                age={perro.age}
                description={perro.description}
                imageUrl={perro.imageUrl}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-xl text-gray-600 dark:text-gray-400">No se encontraron perros con los criterios seleccionados</h3>
            </div>
          )}
        </div>

        {/* Sección de información sobre adopción */}
        <section className="mt-16 bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">¿Por qué adoptar un perro?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Compañía incondicional</h3>
              <p className="text-gray-600 dark:text-gray-300">Los perros son conocidos por su lealtad y amor incondicional, ofreciendo compañía constante.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Mejora tu salud</h3>
              <p className="text-gray-600 dark:text-gray-300">Tener un perro te anima a hacer ejercicio y puede reducir el estrés y la presión arterial.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Salvas una vida</h3>
              <p className="text-gray-600 dark:text-gray-300">Al adoptar, estás dando una segunda oportunidad a un animal que necesita un hogar.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Perros;