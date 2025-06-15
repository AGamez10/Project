import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';
import DarkModeToggle from '../../components/DarkModeToggle';

export const PerfilUsuario = () => {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState('perfil');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    telefono: '',
    direccion: ''
  });

  const [solicitudes, setSolicitudes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        telefono: user.telefono || '',
        direccion: user.direccion || ''
      });
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const [adoptionsResponse] = await Promise.allSettled([
        apiService.getAdoptions({ user_id: user?.id })
      ]);
      
      if (adoptionsResponse.status === 'fulfilled') {
        setSolicitudes(adoptionsResponse.value.data || []);
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSaveProfile = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Simular actualización del perfil (aquí iría la llamada real a la API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el contexto de usuario
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccess('Perfil actualizado correctamente');
      setIsEditing(false);
      
      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  }, [formData, user]);

  const handleCancelEdit = useCallback(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
      direccion: user?.direccion || ''
    });
    setIsEditing(false);
    setError('');
  }, [user]);

  // Memoizar las solicitudes formateadas
  const solicitudesFormateadas = useMemo(() => {
    return solicitudes.map(solicitud => ({
      ...solicitud,
      fechaFormateada: new Date(solicitud.created_at).toLocaleDateString('es-ES'),
      estadoColor: solicitud.status === 'aprobada' ? 'green' : 
                   solicitud.status === 'rechazada' ? 'red' : 'yellow'
    }));
  }, [solicitudes]);

  return (
    <div className="min-h-screen p-8 fade-in bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 transition-colors duration-200">
      <DarkModeToggle />
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Cabecera del perfil */}
          <div className="bg-gray-100 dark:bg-gray-600 p-6 sm:p-10 text-gray-700 dark:text-gray-200">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-24 h-24 rounded-full border-4 border-white mb-4 sm:mb-0 sm:mr-6 bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {formData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{formData.name}</h1>
                <p className="">{formData.email}</p>
              </div>
            </div>
          </div>
          
          {/* Pestañas de navegación */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex flex-wrap">
              <button
                onClick={() => setActiveTab('perfil')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'perfil' 
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Información Personal
              </button>
              <button
                onClick={() => setActiveTab('solicitudes')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'solicitudes' 
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Solicitudes de Adopción ({solicitudes.length})
              </button>
              <button
                onClick={() => setActiveTab('favoritos')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'favoritos' 
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Favoritos ({favoritos.length})
              </button>
            </nav>
          </div>
          
          {/* Contenido de las pestañas */}
          <div className="p-6">
            {/* Mensajes de estado */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-fade-in">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded animate-fade-in">
                {success}
              </div>
            )}

            {activeTab === 'perfil' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Información Personal
                  </h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Editar Perfil
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Dirección
                        </label>
                        <input
                          type="text"
                          name="direccion"
                          value={formData.direccion}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre completo</h3>
                      <p className="text-gray-800 dark:text-white">{formData.name}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Correo electrónico</h3>
                      <p className="text-gray-800 dark:text-white">{formData.email}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</h3>
                      <p className="text-gray-800 dark:text-white">{formData.telefono || 'No especificado'}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dirección</h3>
                      <p className="text-gray-800 dark:text-white">{formData.direccion || 'No especificada'}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'solicitudes' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Solicitudes de Adopción
                </h2>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando solicitudes...</p>
                  </div>
                ) : solicitudesFormateadas.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Mascota
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Fecha
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Estado
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Mensaje
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {solicitudesFormateadas.map((solicitud) => (
                          <tr key={solicitud.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {solicitud.pet?.name || 'Mascota no disponible'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {solicitud.fechaFormateada}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                solicitud.estadoColor === 'green' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                                  : solicitud.estadoColor === 'red'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                              }`}>
                                {solicitud.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 dark:text-gray-200 max-w-xs truncate">
                              {solicitud.message || 'Sin mensaje'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No tienes solicitudes de adopción activas.
                    </p>
                    <a 
                      href="/perros" 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Explorar Mascotas
                    </a>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'favoritos' && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Mascotas Favoritas
                </h2>
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    No has agregado mascotas a favoritos.
                  </p>
                  <div className="space-x-2">
                    <a 
                      href="/perros" 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Explorar Perros
                    </a>
                    <a 
                      href="/gatos" 
                      className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Explorar Gatos
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuario;