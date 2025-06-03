import { useEffect } from "react";
import { Link } from "react-router-dom";

const ConocerMasPerros = () => {
  useEffect(() => {
    document.title = "Conocer más sobre Perros | AdoptaFácil";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      {/* Header */}
      <section className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 dark:from-green-600 dark:to-blue-700">
        <div className="container mx-auto text-center relative px-4 z-10">
          <h1 className="text-4xl font-bold mb-6">Todo sobre Perros</h1>
          <p className="text-xl mb-8 mx-auto max-w-2xl">
            Guía completa para entender, cuidar y disfrutar de tu compañero
            canino
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-12 z-10 relative">
        {/* Sección de introducción */}
        <section className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            ¿Por qué adoptar un perro?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Adoptar un perro es una de las decisiones más gratificantes que
            puedes tomar. Los perros ofrecen compañía incondicional, lealtad y
            amor sin límites. Además, al adoptar estás dando una segunda
            oportunidad a un animal que lo necesita.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Los estudios demuestran que tener un perro puede mejorar tu salud
            física y mental, reduciendo el estrés, la ansiedad y promoviendo un
            estilo de vida más activo.
          </p>
        </section>

        {/* Sección de cuidados básicos */}
        <section className="mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Cuidados básicos
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Alimentación
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>
                  Proporciona alimento de calidad adecuado a su edad, tamaño y
                  nivel de actividad
                </li>
                <li>Establece horarios regulares de alimentación</li>
                <li>Asegúrate de que siempre tenga agua fresca disponible</li>
                <li>Consulta con tu veterinario sobre la dieta más adecuada</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Ejercicio
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Paseos diarios de al menos 30 minutos</li>
                <li>Juegos que estimulen su mente y cuerpo</li>
                <li>Adapta el ejercicio a la raza, edad y condición física</li>
                <li>
                  El ejercicio regular previene problemas de comportamiento
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Salud
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Visitas regulares al veterinario</li>
                <li>Vacunación y desparasitación según calendario</li>
                <li>Cepillado dental regular</li>
                <li>Atención a cambios en su comportamiento o apetito</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Higiene
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Baños periódicos según el tipo de pelaje</li>
                <li>Cepillado regular para eliminar pelo muerto</li>
                <li>Limpieza de oídos y corte de uñas</li>
                <li>Mantén limpio su espacio y juguetes</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sección de entrenamiento */}
        <section className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Entrenamiento básico
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            El entrenamiento es esencial para una convivencia armoniosa con tu
            perro. Utiliza siempre el refuerzo positivo y la paciencia como base
            de cualquier entrenamiento.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                Socialización
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Expón a tu perro desde cachorro a diferentes personas, animales
                y situaciones para que desarrolle confianza.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                Comandos básicos
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enseña comandos como "sentado", "quieto", "ven" y "suelta" para
                garantizar su seguridad y control.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                Paseo con correa
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Entrena a tu perro para caminar correctamente con correa sin
                tirar, utilizando recompensas y consistencia.
              </p>
            </div>
          </div>
        </section>

        {/* Sección de razas populares */}
        <section className="mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Razas populares y sus características
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Labrador Retriever
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Amigable, activo y excelente con niños. Necesita ejercicio
                regular y es fácil de entrenar.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Esperanza de vida: 10-12 años
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Pastor Alemán
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Inteligente, leal y versátil. Excelente perro de trabajo y
                protector de la familia.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Esperanza de vida: 9-13 años
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Bulldog Francés
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                Juguetón, alerta y adaptable. Ideal para apartamentos y
                familias.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Esperanza de vida: 10-12 años
              </p>
            </div>
          </div>
        </section>

        {/* Sección de adopción */}
        <section className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 rounded-xl shadow-md mb-12 fade-in dark:from-blue-700 dark:to-green-700">
          <h2 className="text-2xl font-bold mb-4">¿Listo para adoptar?</h2>
          <p className="mb-6">
            Si después de leer esta información estás decidido a adoptar un
            perro, te invitamos a explorar nuestros perros disponibles y
            encontrar a tu compañero ideal.
          </p>
          <Link
            to="/perros"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
          >
            Ver perros disponibles
          </Link>
        </section>

        {/* Sección de recursos adicionales */}
        <section className="fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Recursos adicionales
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Libros recomendados
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>"El lenguaje de los perros" por Stanley Coren</li>
                <li>"Adiestramiento canino positivo" por Jaime Vidal</li>
                <li>"El perro perfecto" por Cesar Millan</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">
                Sitios web útiles
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>American Kennel Club - información sobre razas</li>
                <li>ASPCA - consejos de cuidado y entrenamiento</li>
                <li>The Spruce Pets - guías prácticas para dueños</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConocerMasPerros;
