import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../public/Logo.png";
import LogoWhite from "../../../public/LogoWhite.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="shadow-md z-10 relative bg-white dark:bg-gray-800 dark:shadow-dark">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        {/* Logo y nombre */}
        <div className="flex items-center space-x-2">
          <img
            src={Logo}
            alt="Logo Adoptafácil"
            className="h-12 w-full block dark:hidden"
            width="48"
            height="48"
            loading="lazy"
          />
          <img
            src={LogoWhite}
            alt="Logo Adoptafácil"
            className="h-12 w-full hidden dark:block"
            width="48"
            height="48"
            loading="lazy"
          />
          <h1 className="hidden md:block font-bold text-blue-600 dark:text-blue-400">
            ADOPTAFÁCIL
          </h1>
        </div>

        {/* Botón de menú hamburguesa para móviles */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Menú"
        >
          <svg
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Menú principal */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute top-full left-0 right-0 bg-white dark:bg-gray-800 md:static md:flex md:bg-transparent dark:md:bg-transparent space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0 shadow-lg md:shadow-none`}
        >
          <Link
            to="/perros"
            className="block text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
          >
            PERROS
          </Link>
          <Link
            to="/gatos"
            className="block text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
          >
            GATOS
          </Link>
          <Link
            to="/registro-opciones"
            className="block text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
          >
            REGISTRARSE
          </Link>
          <Link
            to="#"
            className="block text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400"
          >
            CONTACTO
          </Link>
        </nav>

        {/* Boton de acción (Iniciar Sesion) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
