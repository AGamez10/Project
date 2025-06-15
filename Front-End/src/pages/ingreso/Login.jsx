import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground";
import DarkModeToggle from "../../components/DarkModeToggle";
import GoogleSignInButton from "../../components/GoogleSignInButton";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    document.title = "Adoptafácil - Inicio de sesión";
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData);
      // Redirigir a la página que intentaba acceder o al dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Credenciales incorrectas. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden relative bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
      <ParticlesBackground />
      <DarkModeToggle />
      {/* Contenedor principal */}
      <div className=" container text-center max-w-md w-full p-5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg z-10 animate-fade-in hover:shadow-xl hover:scale-[1.005] transition-transform duration-300 ease-in-out">
        {/* Logo */}
        <img src="/Logo.png" alt="Logo" className="w-56 h-36 mx-auto mb-8" />

        {/* Formulario */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {/* Correo */}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Ingresar */}
          <button
            type="submit"
            disabled={loading}
            className="w-1/3 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800 disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          {/* Olvidé mi contraseña */}
          <p className="mt-4">
            <Link
              to="#"
              className="text-blue-500 dark:text-gray-100 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </p>

          {/* Separador */}
          <div className="my-6 flex items-center">
            <hr className="flex-1 border-t border-gray-400" />
            <span className="px-4 text-gray-500 text-sm">o</span>
            <hr className="flex-1 border-t border-gray-400" />
          </div>

          {/* Google Sign In */}
          <GoogleSignInButton className="mb-4" />

          {/* Separador */}
          <hr className="my-6 border-t border-gray-400" />

          {/* Crear cuenta */}
          <Link
            to="/registro-opciones"
            className="w-1/3 mx-auto px-4 py-2 bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 text-center"
          >
            Crear cuenta
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
