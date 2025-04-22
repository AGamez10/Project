import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../public/Logo.png';
import ParticlesBackground from '../../components/ParticlesBackground';
import DarkModeToggle from '../../components/DarkModeToggle';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    fecha: '',
    ciudad: 'bo',
    direccion: '',
    correo: '',
    clave: '',
    aceptar: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica para enviar los datos al backend
  };

  const handleDateFocus = (e) => {
    e.target.type = 'date';
  };

  const handleDateBlur = (e) => {
    if (!e.target.value) {
      e.target.type = 'text';
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
      <ParticlesBackground />
      <DarkModeToggle />
      <div className="container text-center max-w-md w-full p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg z-10 animate-fade-in hover:shadow-xl hover:scale-[1.005] transition-all duration-300">
        <img 
          src={Logo} 
          alt="Logo" 
          className="w-56 h-36 mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-700 to-blue-800 dark:from-green-300 dark:to-blue-300 bg-clip-text text-transparent">
          Registro de usuario
        </h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Nombre completo */}
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre Completo"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Edad */}
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            placeholder="Edad"
            min="18"
            max="100"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Fecha de nacimiento */}
          <input
            type="text"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            onFocus={handleDateFocus}
            onBlur={handleDateBlur}
            placeholder="Fecha de nacimiento"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Ciudad de residencia */}
          <select
            id="ciudad"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="bo">Bogotá</option>
            <option value="me">Medellín</option>
            <option value="ca">Cali</option>
          </select>
          
          {/* Dirección */}
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Email */}
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Contraseña */}
          <input
            type="password"
            id="clave"
            name="clave"
            value={formData.clave}
            onChange={handleChange}
            placeholder="Contraseña"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Términos y condiciones */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="aceptar"
              name="aceptar"
              checked={formData.aceptar}
              onChange={handleChange}
              required
              className="mr-2 h-5 w-5 rounded border-gray-300 focus:ring"
            />
            <label htmlFor="aceptar" className="text-sm">
              Acepto los <Link to="/tyc" className="text-blue-600 dark:text-gray-100 hover:underline">términos y condiciones</Link>
            </label>
          </div>
          
          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-[1.02] transform"
          >
            Completar registro
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;