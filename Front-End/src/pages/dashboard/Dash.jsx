import React from 'react'
import { StatCard } from './StatCard'
import { Chart } from './Chart'
import { RecentTable } from './RecentTable'

export default function Dash() {
  
  return (
    <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
      <div className="container mx-auto">
        {/* Título de la página */}
        <h1 className="text-2xl font-bold text-white dark:text-gray-200 mb-6">Panel de Control</h1>
        
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <StatCard 
            title="Total Mascotas" 
            value="1,234" 
            icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            color="blue"
            change="+12%"/>
          <StatCard 
            title="Adopciones" 
            value="845" 
            icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            color="green"
            change="+5%"/>
          <StatCard 
            title="Donaciones" 
            value="$12,456" 
            icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
            color="purple"
            change="+18%"/>
          <StatCard 
            title="Usuarios" 
            value="2,345" 
            icon="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            color="orange"
            change="+7%"/>
        </div>
        
        {/* Gráficos y tablas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Gráfico principal */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 fade-in">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Adopciones por mes</h2>
            <Chart />
          </div>
          
          {/* Estadísticas adicionales */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 fade-in">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Distribución por tipo</h2>
            <div className="space-y-4">
              {[
                { name: 'Perros', value: 65, color: 'bg-blue-500' },
                { name: 'Gatos', value: 25, color: 'bg-green-500' },
                { name: 'Conejos', value: 7, color: 'bg-purple-500' },
                { name: 'Aves', value: 10, color: 'bg-yellow-500' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className={`${item.color} h-2.5 rounded-full`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tabla de actividades recientes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 fade-in">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Actividades recientes</h2>
          <RecentTable />
        </div>
      </div>
    </main>
  )
}