import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../public/Logo.png';
import Dog from '../../../public/dog.png';
import ParticlesBackground from '../../components/ParticlesBackground';

const Error404 = () => {
  useEffect(() => {
    document.title = "Página no encontrada | AdoptaFácil";
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-blue-500 text-white relative font-[Poppins] overflow-hidden">
      <ParticlesBackground />
      <div className="text-center max-w-xl w-[70%] p-16 backdrop-blur-sm bg-white/0 border border-white/20 rounded-3xl shadow-xl fade-in z-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-green-700 to-blue-800 bg-clip-text text-transparent mb-6">
          ERROR 404
        </h1>
        <p className="text-xl mb-2">Página no encontrada</p>
        <p className="text-lg text-white/90">
          Lo sentimos, el contenido que buscas no está disponible o ha sido movido.
        </p>
        <Link
          to="/dashboard"
          className="inline-block mt-6 px-10 py-3 rounded-full font-bold text-green-900 bg-white/50 border border-white/30 hover:bg-white/30 transition"
        >
          Volver al inicio
        </Link>
      </div>

      <div className="fixed bottom-5 left-5 opacity-80 z-0">
        <img src={Logo} alt="Logo" className="w-24 h-16" />
      </div>
      <div className="fixed opacity-80 z-0">
        <img src={Dog} alt="Perro" className="w-[300px] h-[300px]" />
      </div>
    </div>
  );
};

export default Error404;