export default function PendingRequests() {
  // Datos de ejemplo para solicitudes pendientes
  const requests = [
    {
      id: 1,
      petName: "Max",
      petType: "Perro",
      applicant: "Juan Pérez",
      date: "2023-11-15",
      status: "En proceso",
    },
    {
      id: 2,
      petName: "Luna",
      petType: "Gato",
      applicant: "María López",
      date: "2023-11-14",
      status: "Revisión",
    },
    {
      id: 3,
      petName: "Rocky",
      petType: "Perro",
      applicant: "Carlos Rodríguez",
      date: "2023-11-13",
      status: "Entrevista",
    },
    {
      id: 4,
      petName: "Milo",
      petType: "Gato",
      applicant: "Ana Martínez",
      date: "2023-11-12",
      status: "En proceso",
    },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      "En proceso":
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      Revisión: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Entrevista:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Aprobada:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      Rechazada: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return statusClasses[status] || statusClasses["En proceso"];
  };

  return (
    <div className="flex-auto md:px-52 p-8 fade-in">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Solicitudes Pendientes
        </h1>
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-200 dark:hover:text-blue-100 font-medium">
          Ver todas
        </button>
      </div>

      {requests.length > 0 ? (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Mascota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Solicitante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {request.petName}
                      </div>
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {request.petType}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {request.applicant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {request.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      Ver
                    </button>
                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                      Aprobar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No hay solicitudes pendientes.
          </p>
        </div>
      )}
    </div>
  );
}
