import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DarkModeToggle from '../../components/DarkModeToggle';

const DetalleMascota = () => {
  const { id } = useParams();
  const [mascota, setMascota] = useState({
    id: id || '1',
    nombre: 'Max',
    tipo: 'Perro',
    raza: 'Labrador Mix',
    edad: '2 años',
    sexo: 'Macho',
    tamaño: 'Mediano',
    peso: '15 kg',
    color: 'Dorado',
    descripcion: 'Max es un perro juguetón y cariñoso, ideal para familias con niños. Le encanta correr y jugar en el parque. Es muy sociable con otros perros y está entrenado para hacer sus necesidades fuera de casa.',
    historia: 'Max fue rescatado de la calle cuando tenía apenas 3 meses. Ha estado en un hogar temporal donde ha recibido todos los cuidados necesarios y está listo para encontrar una familia permanente.',
    requisitosAdopcion: [
      'Vivienda con espacio adecuado',
      'Tiempo para paseos diarios',
      'Compromiso de cuidado responsable',
      'Seguimiento post-adopción'
    ],
    vacunas: ['Rabia', 'Parvovirus', 'Moquillo', 'Hepatitis'],
    esterilizado: true,
    imagenes: [
      'https://images.unsplash.com/photo-1583511655826-05700d52f4d9',
      'https://images.unsplash.com/photo-1583511666407-5f06533f2113',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee'
    ],
    estado: 'Disponible',
    ubicacion: 'Bogotá, Colombia'
  });

  const [imagenActiva, setImagenActiva] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    motivoAdopcion: '',
    experienciaPreviaAdopcion: false,
    tieneOtrasMascotas: false,
    aceptaTerminos: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica para enviar la solicitud de adopción
    alert('Solicitud enviada con éxito. Nos pondremos en contacto contigo pronto.');
    setMostrarFormulario(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <DarkModeToggle />
      
      <div className="container mx-auto px-4 py-8">
        {/* Navegación */}
        <div className="text-sm breadcrumbs mb-4">
          <ul className="flex space-x-2 text-gray-600 dark:text-gray-400">
            <li><Link to="/start" className="hover:text-blue-600 dark:hover:text-blue-400">Inicio</Link> /</li>
            <li><Link to={`/${mascota.tipo.toLowerCase()}s`} className="hover:text-blue-600 dark:hover:text-blue-400">{mascota.tipo}s</Link> /</li>
            <li className="text-gray-900 dark:text-white font-medium">{mascota.nombre}</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Galería de imágenes */}
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full">
                <img 
                  src={mascota.imagenes[imagenActiva]} 
                  alt={`${mascota.nombre} - imagen ${imagenActiva + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                {/* Control galería */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button 
                    onClick={() => setImagenActiva((prev) => (prev === 0 ? mascota.imagenes.length - 1 : prev - 1))}
                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  >
                    ❮
                  </button>
                  <button 
                    onClick={() => setImagenActiva((prev) => (prev === mascota.imagenes.length - 1 ? 0 : prev + 1))}
                    className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  >
                    ❯
                  </button>
                </div>
                
                {/* Indicador de estado */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    {mascota.estado}
                  </span>
                </div>
              </div>
              
              {/* Miniaturas */}
              <div className="flex p-2 space-x-2 bg-gray-100 dark:bg-gray-700">
                {mascota.imagenes.map((img, index) => (
                  <button 
                    key={index}
                    onClick={() => setImagenActiva(index)}
                    className={`w-16 h-16 rounded overflow-hidden ${index === imagenActiva ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <img src={img} alt={`Miniatura ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Información de la mascota */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{mascota.nombre}</h1>
                <button className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">{mascota.tipo}</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full text-sm">{mascota.raza}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm">{mascota.edad}</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm">{mascota.sexo}</span>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Descripción</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{mascota.descripcion}</p>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Tamaño</h3>
                  <p className="text-gray-900 dark:text-white">{mascota.tamaño}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Peso</h3>
                  <p className="text-gray-900 dark:text-white">{mascota.peso}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Color</h3>
                  <p className="text-gray-900 dark:text-white">{mascota.color}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ubicación</h3>
                  <p className="text-gray-900 dark:text-white">{mascota.ubicacion}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Estado médico</h3>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="ml-2 text-gray-900 dark:text-white">Vacunado</span>
                  </div>
                  {mascota.esterilizado && (
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-900 dark:text-white">Esterilizado</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <button 
                  onClick={() => setMostrarFormulario(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Solicitar Adopción
                </button>
              </div>
            </div>
          </div>
          
          {/* Información adicional */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Historia</h2>
                <p className="text-gray-600 dark:text-gray-300">{mascota.historia}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Requisitos de Adopción</h2>
                <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                  {mascota.requisitosAdopcion.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de formulario de adopción */}
      {mostrarFormulario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Solicitud de Adopción</h2>
                <button 
                  onClick={() => setMostrarFormulario(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre completo</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Teléfono</label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dirección</label>
                    <input
                      type="text"
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="motivoAdopcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">¿Por qué quieres adoptar a {mascota.nombre}?</label>
                    <textarea
                      id="motivoAdopcion"
                      name="motivoAdopcion"
                      value={formData.motivoAdopcion}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="experienciaPreviaAdopcion"
                        name="experienciaPreviaAdopcion"
                        type="checkbox"
                        checked={formData.experienciaPreviaAdopcion}
                        onChange={handleInputChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="experienciaPreviaAdopcion" className="font-medium text-gray-700 dark:text-gray-300">¿Has adoptado mascotas anteriormente?</label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="tieneOtrasMascotas"
                        name="tieneOtrasMascotas"
                        type="checkbox"
                        checked={formData.tieneOtrasMascotas}
                        onChange={handleInputChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="tieneOtrasMascotas" className="font-medium text-gray-700 dark:text-gray-300">¿Tienes otras mascotas actualmente?</label>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="aceptaTerminos"
                        name="aceptaTerminos"
                        type="checkbox"
                        checked={formData.aceptaTerminos}
                        onChange={handleInputChange}
                        required
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="aceptaTerminos" className="font-medium text-gray-700 dark:text-gray-300">
                        Acepto los <Link to="/tyc" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">términos y condiciones</Link>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleMascota;