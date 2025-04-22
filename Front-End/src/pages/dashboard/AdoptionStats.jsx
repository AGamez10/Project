import React from 'react';

export default function AdoptionStats() {
  // Datos de ejemplo para estadísticas de adopción
  const monthlyStats = [
    { month: 'Enero', adoptions: 45, returns: 2, success: 95.6 },
    { month: 'Febrero', adoptions: 38, returns: 1, success: 97.4 },
    { month: 'Marzo', adoptions: 52, returns: 3, success: 94.2 },
    { month: 'Abril', adoptions: 61, returns: 2, success: 96.7 },
    { month: 'Mayo', adoptions: 57, returns: 4, success: 93.0 },
    { month: 'Junio', adoptions: 64, returns: 1, success: 98.4 }
  ];

  // Estadísticas generales
  const generalStats = {
    totalAdoptions: 317,
    averageMonthly: 52.8,
    successRate: 96.2,
    pendingRequests: 24
  };

  return (
    <div className="flex-auto md:px-52 p-8 fade-in bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Estadísticas de Adopción</h2>
      
      {/* Resumen de estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Adopciones</h3>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{generalStats.totalAdoptions}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Promedio Mensual</h3>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">{generalStats.averageMonthly}</p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">Tasa de Éxito</h3>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{generalStats.successRate}%</p>
        </div>
        <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Solicitudes Pendientes</h3>
          <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{generalStats.pendingRequests}</p>
        </div>
      </div>
      
      {/* Tabla de estadísticas mensuales */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Adopciones</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Devoluciones</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tasa de Éxito</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {monthlyStats.map((stat, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {stat.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {stat.adoptions}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {stat.returns}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stat.success >= 95 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                      {stat.success}%
                    </span>
                    <div className="ml-4 w-24 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className={`h-2.5 rounded-full ${stat.success >= 95 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${stat.success}%` }}></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          Ver informe completo
        </button>
      </div>
    </div>
  );
}