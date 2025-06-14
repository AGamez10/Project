import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ParticlesBackground from "../../components/ParticlesBackground";

const RegistroOpciones = () => {
  useEffect(() => {
    document.title = "Opciones de Registro | AdoptaFácil";
  }, []);

  // Estado para controlar la tarjeta activa
  const [tarjetaActiva, setTarjetaActiva] = useState(null);

  // Opciones de registro disponibles
  const opcionesRegistro = [
    {
      id: 1,
      titulo: "Cuidador",
      descripcion:
        "Regístrate para adoptar, publicar mascotas en adopción o ayudar con recursos para su bienestar.",
      icono: "🐾",
      color: "from-blue-400 to-blue-600",
      ruta: "/registro/cuidador",
    },
    {
      id: 2,
      titulo: "Aliado",
      descripcion:
        "Regístrate como refugio, veterinaria o negocio para ofrecer productos, servicios o atención a las mascotas y sus cuidadores.",
      icono: "🏢",
      color: "from-green-500 to-green-700",
      ruta: "/registro/aliado",
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-200 bg-gradient-to-r from-green-400 to-blue-500  dark:from-green-600 dark:to-blue-700">
      <ParticlesBackground />
      <section className="relative text-white py-20">
        <div className="container mx-auto text-center relative px-4 z-10">
          <h1 className="text-4xl font-bold mb-6">Únete a AdoptaFácil</h1>
          <p className="text-xl mb-8 mx-auto max-w-2xl">
            Selecciona el tipo de cuenta que deseas crear y comienza tu
            experiencia con nosotros
          </p>
        </div>
      </section>

      {/* Contenido principal - Tarjetas de opciones */}
      <main className="container mx-auto px-4 py-12 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 px-32 gap-10 fade-in text-center">
          {opcionesRegistro.map((opcion) => (
            <div
              key={opcion.id}
              className={`bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ${
                tarjetaActiva === opcion.id
                  ? "scale-105 ring-4 ring-blue-500"
                  : "hover:scale-105"
              }`}
              onMouseEnter={() => setTarjetaActiva(opcion.id)}
              onMouseLeave={() => setTarjetaActiva(null)}
            >
              {/* Cabecera de la tarjeta */}
              <div
                className={`bg-gradient-to-r ${opcion.color} p-6 flex justify-center items-center`}
              >
                <span className="text-5xl">{opcion.icono}</span>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {opcion.titulo}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {opcion.descripcion}
                </p>

                <Link
                  to={"/register/"}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  Registrarme
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sección informativa */}
        <section className="mt-16 bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            ¿Por qué registrarte en AdoptaFácil?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                Proceso simplificado
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Facilitamos todo el proceso de adopción, desde la búsqueda hasta
                el seguimiento posterior.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                Comunidad comprometida
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Únete a una red de personas y organizaciones comprometidas con
                el bienestar animal.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                Recursos exclusivos
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Accede a guías, consejos y descuentos especiales según tu tipo
                de cuenta.
              </p>
            </div>
          </div>
        </section>

        {/* Sección de preguntas frecuentes */}
        <section className="mt-12 bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Preguntas frecuentes
          </h2>

          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                ¿Es gratuito el registro?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Sí, el registro es completamente gratuito para todas las
                opciones de cuenta.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                ¿Puedo cambiar mi tipo de cuenta después?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Sí, puedes contactar con nuestro equipo de soporte para
                solicitar un cambio en tu tipo de cuenta.
              </p>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                ¿Qué documentos necesito para registrarme?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Los requisitos varían según el tipo de cuenta. Para fundaciones
                y veterinarias se requiere documentación legal adicional.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegistroOpciones;
