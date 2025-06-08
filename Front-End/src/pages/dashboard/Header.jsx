import React from 'react'

export default function Header( ) {
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
        </div>
      </div>
    </header>
  )
}