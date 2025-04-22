import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 z-10 relative dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Grid de columnas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1 - Información */}
          <div>
            <h3 className="text-xl font-bold mb-4">ADOPTAFÁCIL</h3>
            <p className="text-gray-400">Conectando mascotas con hogares amorosos desde 2023.</p>
          </div>

          {/* Columna 2 - Enlaces útiles */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces útiles</h4>
            <ul className="space-y-2">
              <li><Link to="/como-adoptar" className="text-gray-400 hover:text-white transition">Cómo adoptar</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition">Preguntas frecuentes</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          {/* Columna 3 - Contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">info@adoptafacil.com</li>
              <li className="text-gray-400">+1 234 567 890</li>
            </ul>
          </div>

          {/* Columna 4 - Redes sociales */}
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <Link to="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition">FB</Link>
              <Link to="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition">IG</Link>
              <Link to="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition">TW</Link>
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2023 Adoptafácil. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;