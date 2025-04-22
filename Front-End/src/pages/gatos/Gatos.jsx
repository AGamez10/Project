import { useState, useEffect } from 'react';
import ParticlesBackground from '../../components/ParticlesBackground';
import PetCard from '../inicio/PetCard';

const Gatos = () => {
  useEffect(() => {
    document.title = "Gatos en Adopción | AdoptaFácil";
  }, []);

  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // Datos de ejemplo de gatos disponibles para adopción
  const gatos = [
    {
      name: 'Luna',
      breed: 'Siamés',
      age: '1 año',
      description: 'Elegante y vocal, muy cariñosa con su familia.',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'
    },
    {
      name: 'Milo',
      breed: 'Atigrado',
      age: '2 años',
      description: 'Juguetón y curioso, le encanta explorar.',
      imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5'
    },
    {
      name: 'Simba',
      breed: 'Maine Coon',
      age: '3 años',
      description: 'Majestuoso y sociable, se lleva bien con otros animales.',
      imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce'
    },
    {
      name: 'Nala',
      breed: 'Persa',
      age: '4 años',
      description: 'Tranquila y elegante, perfecta para hogares tranquilos.',
      imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131'
    },
    {
      name: 'Oliver',
      breed: 'Bengalí',
      age: '2 años',
      description: 'Activo e inteligente, necesita estimulación mental.',
      imageUrl: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803'
    },
    {
      name: 'Cleo',
      breed: 'Ragdoll',
      age: '1 año',
      description: 'Dócil y cariñosa, le encanta ser mimada.',
      imageUrl: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987'
    }
  ];

  // Filtrar gatos según la búsqueda y el filtro seleccionado
  const gatosFiltrados = gatos.filter(gato => {
    const coincideBusqueda = gato.name.toLowerCase().includes(busqueda.toLowerCase()) || 
                            gato.breed.toLowerCase().includes(busqueda.toLowerCase());
    
    if (filtro === 'todos') return coincideBusqueda;
    if (filtro === 'jovenes') return coincideBusqueda && gato.age.includes('1');
    if (filtro === 'adultos') return coincideBusqueda && (gato.age.includes('2') || gato.age.includes('3'));
    if (filtro === 'mayores') return coincideBusqueda && parseInt(gato.age) >= 4;
    
    return coincideBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      {/* Sección de cabecera con fondo de partículas */}
      <section className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 dark:from-green-600 dark:to-blue-700">
        <div className="container mx-auto text-center relative px-4 z-10">
          <h1 className="text-4xl font-bold mb-6">Gatos en Adopción</h1>
          <p className="text-xl mb-8 mx-auto max-w-2xl">Descubre a tu compañero felino ideal entre nuestros adorables gatos que buscan un hogar lleno de amor</p>
          
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
            Jóvenes (1 año)
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

        {/* Grid de tarjetas de gatos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 fade-in">
          {gatosFiltrados.length > 0 ? (
            gatosFiltrados.map((gato, index) => (
              <PetCard
                key={index}
                name={gato.name}
                breed={gato.breed}
                age={gato.age}
                description={gato.description}
                imageUrl={gato.imageUrl}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <h3 className="text-xl text-gray-600 dark:text-gray-400">No se encontraron gatos con los criterios seleccionados</h3>
            </div>
          )}
        </div>

        {/* Sección de información sobre adopción */}
        <section className="mt-16 bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">¿Por qué adoptar un gato?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Independientes</h3>
              <p className="text-gray-600 dark:text-gray-300">Los gatos son mascotas autosuficientes, ideales para personas con estilos de vida ocupados.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Terapéuticos</h3>
              <p className="text-gray-600 dark:text-gray-300">El ronroneo de los gatos tiene efectos terapéuticos y puede reducir el estrés y la ansiedad.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Bajo mantenimiento</h3>
              <p className="text-gray-600 dark:text-gray-300">Requieren menos espacio y cuidados que otras mascotas, siendo perfectos para apartamentos.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Gatos;