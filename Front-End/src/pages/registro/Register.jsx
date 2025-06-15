import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';
import DarkModeToggle from '../../components/DarkModeToggle';
import { useAuth } from '../../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    aceptar: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.password_confirmation) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Error al registrar usuario. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center relative overflow-y-auto bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
      <ParticlesBackground />
      <DarkModeToggle />
      <div className="container text-center max-w-md w-full p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-lg z-10 animate-fade-in hover:shadow-xl hover:scale-[1.005] transition-all duration-300">
        <img 
          src="/Logo.png" 
          alt="Logo" 
          className="w-56 h-36 mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-700 to-blue-800 dark:from-green-300 dark:to-blue-300 bg-clip-text text-transparent">
          Registro de usuario
        </h1>
        
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Nombre completo */}
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre Completo"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Email */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Contraseña */}
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Confirmar Contraseña */}
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleChange}
            placeholder="Confirmar Contraseña"
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
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 hover:scale-[1.02] transform disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Completar registro'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;