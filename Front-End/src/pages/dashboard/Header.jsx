import React from 'react'

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="bg-white shadow-md z-10 relative dark:bg-gray-800 dark:shadow-dark">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
        </div>
        
        {/* Boton de acción */}
        <div className="flex items-center space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition dark:bg-blue-700 dark:hover:bg-blue-800">
            Notificaciones
          </button>
          
          {/* Botón de modo oscuro */}
          <button 
            onClick={toggleDarkMode}
            className="bg-gray-800 text-white p-3 rounded-full shadow-lg dark:bg-gray-200 dark:text-gray-800" 
            aria-label="Alternar modo oscuro">
            {darkMode ? (
              <svg className="h-6 w-6" stroke="currentColor">
                <path strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-6 w-6" stroke="currentColor">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}