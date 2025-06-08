import { Link } from 'react-router-dom';

const PetCard = ({ name, breed, age, description, imageUrl }) => {
    // Determinar la ruta de 'conocer más' basada en la raza
    const getConocerMasRoute = () => {
      const lowerBreed = breed.toLowerCase();
      if (lowerBreed.includes('perro') || lowerBreed.includes('pastor') || lowerBreed.includes('labrador') || lowerBreed.includes('bulldog') || lowerBreed.includes('beagle')) {
        return '/conocer-mas-perros';
      } else if (lowerBreed.includes('gato') || lowerBreed.includes('siamés') || lowerBreed.includes('persa') || lowerBreed.includes('bengalí') || lowerBreed.includes('ragdoll')) {
        return '/conocer-mas-gatos';
      } else {
        // Por defecto, redirigir a perros
        return '/conocer-mas-perros';
      }
    };

    return (
      <div className="pet-card bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-xl dark:bg-gray-700 dark:shadow-dark">
        {/* Imagen */}
        <img 
          src={imageUrl} 
          alt={`${name} - ${breed}`}
          className="w-full h-48 object-cover" 
          loading="lazy" 
          width="400" 
          height="192" 
        />
        {/* Contenido */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h3>
          <p className="text-gray-600 mb-2 dark:text-gray-300">{breed} • {age}</p>
          <p className="text-gray-700 mb-4 dark:text-gray-300">{description}</p>
          <Link 
            to={getConocerMasRoute()} 
            className="block w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800 text-center"
          >
            Conocer más
          </Link>
        </div>
      </div>
    );
  };

  
  export default PetCard;