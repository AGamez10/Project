import { useState } from 'react';
import PetCard from './PetCard';
import CategoryCard from './CategoryCard';
import ParticlesBackground from '../../components/ParticlesBackground'; // Asegúrate de que la ruta sea correcta

const Main = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const pets = [
    {
      name: 'Max',
      breed: 'Labrador Mix',
      age: '2 años',
      description: 'Juguetón y cariñoso, ideal para familias con niños.',
      imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9'
    },
    {
      name: 'Luna',
      breed: 'Siamés',
      age: '1 año',
      description: 'Tranquila y curiosa, perfecta para apartamentos.',
      imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba'
    },
    {
      name: 'Bugs',
      breed: 'Conejo Enano',
      age: '6 meses',
      description: 'Tranquilo y amigable, necesita espacio para saltar.',
      imageUrl: 'https://images.ecestaticos.com/PZQajd6jDBfqpwv4RpnsydqY4oQ=/0x0:640x361/1440x810/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fb85%2F2e1%2F615%2Fb852e1615cd11fd2c7739c7942383c13.jpg'
    }
  ];

  const categories = [
    { emoji: '🐶', title: 'Perros', count: '1,200', link: '/perros' },
    { emoji: '🐱', title: 'Gatos', count: '800', link: '/gatos' },
    { emoji: '🐰', title: 'Conejos', count: '150', link: '/conejos' },
    { emoji: '🐦', title: 'Aves', count: '90', link: '/aves' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Lógica de búsqueda aquí
    console.log('Buscando:', searchTerm, 'en', location);
  };

  return (
    <>
      {/* PORTADA PRINCIPAL */}
      <section className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 dark:from-green-600 dark:to-blue-700">
        <ParticlesBackground />
        <div className="container mx-auto text-center relative px-4">
          <h2 className="text-4xl font-bold mb-6">Encuentra a tu nuevo mejor amigo</h2>
          <p className="text-xl mb-8 mx-auto max-w-2xl">Conectamos a mascotas necesitadas con hogares amorosos desde 2025</p>

          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 dark:bg-gray-800">
            {/* Campo de búsqueda por raza */}
            <input
              type="text"
              placeholder="Buscar por raza (Ej: Perro, Gato)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
            />

            {/* Campo de búsqueda por ubicación */}
            <input
              type="text"
              placeholder="Ciudad"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 rounded-lg sm:rounded-none border-t sm:border-t-0 sm:border-l border-gray-200 focus:outline-none text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:placeholder-gray-400"
            />

            {/* Botón de búsqueda */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto px-4 py-12 z-10 relative">
        {/* SECCIÓN: MASCOTAS DISPONIBLES */}
        <section className="mb-16 fade-in">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Mascotas disponibles</h2>
          {/* Grid de tarjetas de mascotas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            {pets.map((pet, index) => (
              <PetCard
                key={index}
                name={pet.name}
                breed={pet.breed}
                age={pet.age}
                description={pet.description}
                imageUrl={pet.imageUrl}
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN: CATEGORÍAS */}
        <section className="mb-16 fade-in">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white">Explora por categoría</h2>

          {/* Grid de categorías */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                emoji={category.emoji}
                title={category.title}
                count={category.count}
                link={category.link}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Main;