import React, { useState } from "react";

export default function DonationsSummary() {
  // Estado para el modal del formulario de donación
  const [showDonationFormModal, setShowDonationFormModal] = useState(false);

  // --- INICIO: Lógica y estado del formulario de Donaciones.jsx ---
  const [montoSeleccionado, setMontoSeleccionado] = useState("");
  const [montoPersonalizado, setMontoPersonalizado] = useState("");
  const [formaDePago, setFormaDePago] = useState("tarjeta");
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
    direccion: "",
    ciudad: "",
    pais: "", // Considera si este campo es necesario aquí o si se puede prellenar/eliminar
    codigoPostal: "",
  });
  const [mostrarAgradecimiento, setMostrarAgradecimiento] = useState(false);

  const handleMontoClick = (monto) => {
    setMontoSeleccionado(monto);
    setMontoPersonalizado("");
  };

  const handleMontoPersonalizadoChange = (e) => {
    setMontoPersonalizado(e.target.value);
    setMontoSeleccionado("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitDonationForm = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago
    // Simulamos una donación exitosa
    console.log("Donación enviada:", { monto: montoFinal, ...formData });
    setMostrarAgradecimiento(true);
    // No cerramos el modal aquí para que se vea el agradecimiento.
    // El usuario cerrará el modal manualmente o el mensaje de agradecimiento podría tener un botón para cerrar.
  };

  const montoFinal = montoSeleccionado || montoPersonalizado;

  const resetDonationForm = () => {
    setMontoSeleccionado("");
    setMontoPersonalizado("");
    setFormaDePago("tarjeta");
    setFormData({
      nombre: "",
      email: "",
      numeroTarjeta: "",
      fechaExpiracion: "",
      cvv: "",
      direccion: "",
      ciudad: "",
      pais: "",
      codigoPostal: "",
    });
    setMostrarAgradecimiento(false);
  };

  const handleCloseModal = () => {
    setShowDonationFormModal(false);
    resetDonationForm(); // Resetea el formulario al cerrar el modal
  };
  // --- FIN: Lógica y estado del formulario de Donaciones.jsx ---

  // Datos de ejemplo para donaciones (existente en tu archivo)
  const donations = [
    {
      id: 1,
      donor: "María López",
      amount: 150000,
      date: "2023-11-14",
      type: "Monetaria",
    },
    {
      id: 2,
      donor: "Pedro Gómez",
      amount: 75000,
      date: "2023-11-11",
      type: "Monetaria",
    },
    // ... más donaciones
  ];
  const stats = {
    totalAmount: 575000,
    averageAmount: 115000,
    donorsCount: 5,
    monthlyGrowth: "+12%",
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    // Asegúrate de que el fondo de esta página sea transparente si DashboardLayout ya tiene partículas
    // Por ejemplo, elimina "bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700"
    // si lo tenías aquí y quieres que se vean las partículas del layout.
    // Por ahora, mantendré el 'fade-in' y asumiré que el layout maneja el fondo principal.
    <div className="flex-auto md:px-52 p-8 fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Resumen de Donaciones
        </h2>
        <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          Ver todas
        </button>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* ... (código de tarjetas de estadísticas sin cambios) ... */}
        <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300">
            Total Recaudado
          </h3>
          <p className="text-xl font-bold text-purple-800 dark:text-purple-200">
            {formatCurrency(stats.totalAmount)}
          </p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 dark:text-blue-300">
            Promedio
          </h3>
          <p className="text-xl font-bold text-blue-800 dark:text-blue-200">
            {formatCurrency(stats.averageAmount)}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 dark:text-green-300">
            Donantes
          </h3>
          <p className="text-xl font-bold text-green-800 dark:text-green-200">
            {stats.donorsCount}
          </p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-orange-700 dark:text-orange-300">
            Crecimiento
          </h3>
          <p className="text-xl font-bold text-orange-800 dark:text-orange-200">
            {stats.monthlyGrowth}
          </p>
        </div>
      </div>

      {/* Tabla de donaciones recientes */}
      <div className="overflow-x-auto">
        {/* ... (código de la tabla sin cambios) ... */}
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Donante
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Monto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tipo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {donations.map((donation) => (
              <tr
                key={donation.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700"
              >
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

      {/* Botón de acción modificado */}
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            resetDonationForm();
            setShowDonationFormModal(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition dark:bg-purple-700 dark:hover:bg-purple-800"
        >
          Quiero donar
        </button>
      </div>

      {/* Modal para el formulario de donación */}
      {showDonationFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
            {/* Contenido del modal (formulario) */}
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mostrarAgradecimiento
                    ? "Gracias por Donar"
                    : "Realizar una Donación"}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition"
                  aria-label="Cerrar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {mostrarAgradecimiento ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600 dark:text-green-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Tu generosa contribución de {formatCurrency(montoFinal)}{" "}
                    ayudará a muchas mascotas. Hemos enviado un recibo a tu
                    correo electrónico ({formData.email}).
                  </p>
                  <button
                    onClick={() => {
                      resetDonationForm(); // Permite realizar otra donación en el mismo modal
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition mr-2"
                  >
                    Realizar otra donación
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg transition dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitDonationForm}>
                  {/* Selección de monto */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Selecciona un monto (COP)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["10000", "25000", "50000", "100000"].map((monto) => (
                        <button
                          key={monto}
                          type="button"
                          onClick={() => handleMontoClick(monto)}
                          className={`py-3 px-2 rounded-lg border text-sm sm:text-base ${
                            montoSeleccionado === monto
                              ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200"
                              : "border-gray-300 text-gray-700 hover:border-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400"
                          }`}
                        >
                          {formatCurrency(monto)}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3">
                      <label
                        htmlFor="montoPersonalizadoModal"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        O ingresa un monto personalizado
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 dark:text-gray-400">
                            $
                          </span>
                        </div>
                        <input
                          type="number"
                          id="montoPersonalizadoModal"
                          value={montoPersonalizado}
                          onChange={handleMontoPersonalizadoChange}
                          className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Otro monto"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Forma de pago */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Forma de pago
                    </h3>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setFormaDePago("tarjeta")}
                        className={`py-2 px-4 rounded-lg border text-sm ${
                          formaDePago === "tarjeta"
                            ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200"
                            : "border-gray-300 text-gray-700 hover:border-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400"
                        }`}
                      >
                        Tarjeta
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormaDePago("paypal")}
                        className={`py-2 px-4 rounded-lg border text-sm ${
                          formaDePago === "paypal"
                            ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-200"
                            : "border-gray-300 text-gray-700 hover:border-blue-500 dark:border-gray-600 dark:text-gray-300 dark:hover:border-blue-400"
                        }`}
                      >
                        PayPal
                      </button>
                    </div>
                  </div>

                  {/* Información personal */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Información personal
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="nombreModal"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          id="nombreModal"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleInputChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="emailModal"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          id="emailModal"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Información de pago (si es tarjeta) */}
                  {formaDePago === "tarjeta" && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Información de pago
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="numeroTarjetaModal"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Número de tarjeta
                          </label>
                          <input
                            type="text"
                            id="numeroTarjetaModal"
                            name="numeroTarjeta"
                            value={formData.numeroTarjeta}
                            onChange={handleInputChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="fechaExpiracionModal"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              Expiración (MM/AA)
                            </label>
                            <input
                              type="text"
                              id="fechaExpiracionModal"
                              name="fechaExpiracion"
                              value={formData.fechaExpiracion}
                              onChange={handleInputChange}
                              required
                              placeholder="MM/AA"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="cvvModal"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                            >
                              CVV
                            </label>
                            <input
                              type="text"
                              id="cvvModal"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleInputChange}
                              required
                              placeholder="123"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                        {/* Dirección de facturación (opcional, si tu pasarela lo requiere) */}
                      </div>
                    </div>
                  )}

                  {formaDePago === "paypal" && (
                    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg text-center">
                      <p className="text-blue-700 dark:text-blue-300">
                        Serás redirigido a PayPal para completar tu donación de
                        forma segura.
                      </p>
                    </div>
                  )}

                  {/* Resumen de donación */}
                  <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center text-md">
                      <span className="text-gray-700 dark:text-gray-300">
                        Monto a donar:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {montoFinal
                          ? formatCurrency(montoFinal)
                          : formatCurrency(0)}
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={!montoFinal || parseFloat(montoFinal) <= 0}
                      className={`w-full sm:w-auto py-3 px-8 rounded-lg text-white font-medium text-lg transition ${
                        !montoFinal || parseFloat(montoFinal) <= 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      Completar donación
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
