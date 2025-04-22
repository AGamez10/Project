import React from 'react';

export default function DonationsSummary() {
  // Datos de ejemplo para donaciones
  const donations = [
    { id: 1, donor: 'María López', amount: 150000, date: '2023-11-14', type: 'Monetaria' },
    { id: 2, donor: 'Pedro Gómez', amount: 75000, date: '2023-11-11', type: 'Monetaria' },
    { id: 3, donor: 'Ana Martínez', amount: 200000, date: '2023-11-08', type: 'Monetaria' },
    { id: 4, donor: 'Carlos Rodríguez', amount: 50000, date: '2023-11-05', type: 'Monetaria' },
    { id: 5, donor: 'Laura Sánchez', amount: 100000, date: '2023-11-02', type: 'Monetaria' }
  ];

  // Estadísticas de donaciones
  const stats = {
    totalAmount: 575000,
    averageAmount: 115000,
    donorsCount: 5,
    monthlyGrowth: '+12%'
  };

  // Formato de moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="flex-auto md:px-52 p-8 fade-in bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Resumen de Donaciones</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          Ver todas
        </button>
      </div>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Recaudado</h3>
          <p className="text-xl font-bold text-purple-800 dark:text-purple-200">{formatCurrency(stats.totalAmount)}</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">Promedio</h3>
          <p className="text-xl font-bold text-blue-800 dark:text-blue-200">{formatCurrency(stats.averageAmount)}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 dark:text-green-300">Donantes</h3>
          <p className="text-xl font-bold text-green-800 dark:text-green-200">{stats.donorsCount}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-orange-700 dark:text-orange-300">Crecimiento</h3>
          <p className="text-xl font-bold text-orange-800 dark:text-orange-200">{stats.monthlyGrowth}</p>
        </div>
      </div>
      
      {/* Tabla de donaciones recientes */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Donante</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Monto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tipo</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {donations.map((donation) => (
              <tr key={donation.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {donation.donor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(donation.amount)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {donation.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    {donation.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Botón de acción */}
      <div className="mt-6 text-center">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition dark:bg-purple-700 dark:hover:bg-purple-800">
          Registrar nueva donación
        </button>
      </div>
    </div>
  );
}