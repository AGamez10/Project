import { useState, useEffect } from 'react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'enabled';
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', newDarkMode ? 'enabled' : 'disabled');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-800 dark:shadow-dark">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="Logo Adoptafácil" className="h-10 md:h-12" />
          <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">ADOPTAFÁCIL</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">ADOPTAR</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">DONAR</a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">TESTIMONIOS</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Alternar modo oscuro"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800">Iniciar sesión</a>
        </div>
      </div>
    </header>
  );
};

export default Header;