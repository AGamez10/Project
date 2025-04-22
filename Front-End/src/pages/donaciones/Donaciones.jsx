import { useState } from 'react';
import ParticlesBackground from '../../components/ParticlesBackground';
import DarkModeToggle from '../../components/DarkModeToggle';

const Donaciones = () => {
  const [montoSeleccionado, setMontoSeleccionado] = useState('');
  const [montoPersonalizado, setMontoPersonalizado] = useState('');
  const [formaDePago, setFormaDePago] = useState('tarjeta');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: '',
    direccion: '',
    ciudad: '',
    pais: '',
    codigoPostal: ''
  });

  const [mostrarAgradecimiento, setMostrarAgradecimiento] = useState(false);

  const handleMontoClick = (monto) => {
    setMontoSeleccionado(monto);
    setMontoPersonalizado('');
  };

  const handleMontoPersonalizadoChange = (e) => {
    setMontoPersonalizado(e.target.value);
    setMontoSeleccionado('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago
    // Simulamos una donación exitosa
    setMostrarAgradecimiento(true);
  };

  const montoFinal = montoSeleccionado || montoPersonalizado;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <ParticlesBackground />
      <DarkModeToggle />
      
      <div className="container mx-auto px-4 py-12">
        {mostrarAgradecimiento ? (
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¡Gracias por tu donación!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Tu generosa contribución de ${montoFinal} ayudará a muchas mascotas a encontrar un hogar amoroso.
              Hemos enviado un recibo a tu correo electrónico.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => setMostrarAgradecimiento(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition"
              >
                Realizar otra donación
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Haz una donación</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Tu apoyo nos permite rescatar, cuidar y encontrar hogares para mascotas abandonadas.
                Cada donación marca la diferencia.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-8">
                <form onSubmit={handleSubmit}>
                  {/* Selección de monto */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Selecciona un monto</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {['10000', '25000', '50000', '100000'].map((monto) => (
                        <button
                          key={monto}
                          type="button"
                          onClick={() => handleMontoClick(monto)}
                          className={`py-3 px-4 rounded-lg border ${montoSeleccionado === monto ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200' : 'border-gray-300 text-gray-700 hover:border-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400'}`}
                        >
                          ${parseInt(monto).toLocaleString()}
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="montoPersonalizado" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">O ingresa un monto personalizado</label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400">$</span>
                        </div>
                        <input
                          type="number"
                          id="montoPersonalizado"
                          value={montoPersonalizado}
                          onChange={handleMontoPersonalizadoChange}
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Otro monto"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Forma de pago */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Forma de pago</h2>
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setFormaDePago('tarjeta')}
                        className={`py-2 px-4 rounded-lg border ${formaDePago === 'tarjeta' ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200' : 'border-gray-300 text-gray-700 hover:border-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400'}`}
                      >
                        Tarjeta de crédito/débito
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormaDePago('paypal')}
                        className={`py-2 px-4 rounded-lg border ${formaDePago === 'paypal' ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200' : 'border-gray-300 text-gray-700 hover:border-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400'}`}
                      >
                        PayPal
                      </button>
                    </div>
                  </div>
                  
                  {/* Información personal */}
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Información personal</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre completo</label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo electrónico</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Información de pago */}
                  {formaDePago === 'tarjeta' && (
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Información de pago</h2>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Número de tarjeta</label>
                          <input
                            type="text"
                            id="numeroTarjeta"
                            name="numeroTarjeta"
                            value={formData.numeroTarjeta}
                            onChange={handleInputChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="fechaExpiracion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha de expiración</label>
                            <input
                              type="text"
                              id="fechaExpiracion"
                              name="fechaExpiracion"
                              value={formData.fechaExpiracion}
                              onChange={handleInputChange}
                              required
                              placeholder="MM/AA"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CVV</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              placeholder="123"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dirección de facturación</label>
                          <input
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ciudad</label>
                            <input
                              type="text"
                              id="ciudad"
                              name="ciudad"
                              value={formData.ciudad}
                              onChange={handleInputChange}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Código postal</label>
                            <input
                              type="text"
                              id="codigoPostal"
                              name="codigoPostal"
                              value={formData.codigoPostal}
                              onChange={handleInputChange}
                              required
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Resumen de donación */}
                  <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Resumen de tu donación</h2>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-700 dark:text-gray-300">Monto a donar:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {montoFinal ? `$${parseInt(montoFinal).toLocaleString()}` : '$0'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Botón de envío */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={!montoFinal}
                      className={`py-3 px-8 rounded-lg text-white font-medium text-lg transition ${montoFinal ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    >
                      Completar donación
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Donación segura</h3>
                <p className="text-gray-600 dark:text-gray-300">Todas las transacciones son procesadas con los más altos estándares de seguridad.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Transparencia</h3>
                <p className="text-gray-600 dark:text-gray-300">El 100% de tu donación se destina directamente al cuidado y bienestar de las mascotas.</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contacto</h3>
                <p className="text-gray-600 dark:text-gray-300">¿Tienes preguntas sobre donaciones? Escríbenos a donaciones@adoptafacil.com</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donaciones;