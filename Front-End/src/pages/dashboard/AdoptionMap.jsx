import React from 'react';

export default function AdoptionMap() {
  // En un entorno real, aquí se integraría una biblioteca de mapas como Google Maps, Leaflet, etc.
  // Para este ejemplo, mostraremos una representación visual simplificada
  
  // Datos de ejemplo para ubicaciones de mascotas disponibles
  const locations = [
    { id: 1, city: 'Bogotá', count: 45, lat: 4.6097, lng: -74.0817 },
    { id: 2, city: 'Medellín', count: 32, lat: 6.2476, lng: -75.5658 },
    { id: 3, city: 'Cali', count: 28, lat: 3.4516, lng: -76.5320 },
    { id: 4, city: 'Barranquilla', count: 19, lat: 10.9685, lng: -74.7813 },
    { id: 5, city: 'Cartagena', count: 15, lat: 10.3932, lng: -75.4832 }
  ];

  return (
    <div className="flex-auto md:px-52 shadow-md p-6 fade-in bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Mapa de Adopciones</h2>
        <div className="flex space-x-2">
          <select className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option>Todas las mascotas</option>
            <option>Perros</option>
            <option>Gatos</option>
            <option>Otros</option>
          </select>
          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Actualizar
          </button>
        </div>
      </div>
      
      {/* Representación visual del mapa */}
      <div className="relative h-80 bg-blue-50 dark:bg-gray-700 rounded-lg overflow-hidden mb-4">
        {/* Aquí iría el componente de mapa real */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Mapa interactivo de Colombia<br />
            <span className="text-sm">(En un entorno real, aquí se mostraría un mapa interactivo)</span>
          </p>
        </div>
        
        {/* Marcadores simulados */}
        {locations.map((location) => (
          <div 
            key={location.id}
            className="absolute w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:w-7 hover:h-7 transition-all"
            style={{
              // Posiciones simuladas para representación visual
              top: `${30 + (location.lat * 5)}%`,
              left: `${30 + (location.lng * -0.3)}%`,
              zIndex: location.count
            }}
            title={`${location.city}: ${location.count} mascotas disponibles`}
          >
            {location.count}
          </div>
        ))}
      </div>
      
      {/* Leyenda de ciudades */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {locations.map((location) => (
          <div key={location.id} className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg text-center">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{location.city}</h3>
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{location.count}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">mascotas</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          Ver distribución completa
        </button>
      </div>
    </div>
  );
}