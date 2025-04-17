import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';
import Logo from '../../../public/Logo.png';


const Login = () => {
  useEffect(() => {
    document.title = "Adoptafácil - Inicio de sesión";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el envío del formulario
    console.log("Formulario enviado");
  };

  return (
    <div className="bg-gradient-to-br from-green-400 to-blue-500 flex justify-center items-center h-screen overflow-hidden relative">
      <ParticlesBackground />
      {/* Contenedor principal */}
      <div className="container text-center max-w-md w-full p-5 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 shadow-lg z-10 animate-fade-in hover:shadow-xl hover:scale-[1.005] transition-transform duration-300 ease-in-out">
        {/* Logo */}
        <img 
          src={Logo} 
          alt="Logo Adoptafácil" 
          className="w-56 h-36 mx-auto mb-8"
        />
        
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Correo */}
          <input
            type="text"
            id="correo"
            name="correo"
            placeholder="Correo electrónico"
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Contraseña */}
          <input
            type="password"
            id="clave"
            name="clave"
            placeholder="Contraseña"
            required
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Ingresar */}
          <button
            type="submit"
            name="enviar"
            className="w-1/3 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Ingresar
          </button>

          {/* Olvidé mi contraseña */}
          <p className="mt-4">
            <Link to="/recuperar-contrasena" className="text-blue-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>

          {/* Separador */}
          <hr className="my-6 border-t border-gray-300" />

          {/* Crear cuenta */}
          <Link
            to="/register"
            className="w-1/3 mx-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 text-center"
          >
            Crear cuenta
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;