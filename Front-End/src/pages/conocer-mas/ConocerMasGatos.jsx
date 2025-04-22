import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';

const ConocerMasGatos = () => {
  useEffect(() => {
    document.title = "Conocer más sobre Gatos | AdoptaFácil";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      {/* Sección de cabecera con fondo de partículas */}
      <section className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white py-20 dark:from-green-600 dark:to-blue-700">
        <ParticlesBackground />
        <div className="container mx-auto text-center relative px-4 z-10">
          <h1 className="text-4xl font-bold mb-6">Todo sobre Gatos</h1>
          <p className="text-xl mb-8 mx-auto max-w-2xl">Guía completa para entender, cuidar y disfrutar de tu compañero felino</p>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-12 z-10 relative">
        {/* Sección de introducción */}
        <section className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">¿Por qué adoptar un gato?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Los gatos son mascotas maravillosas que aportan alegría, tranquilidad y compañía a nuestras vidas. Son independientes 
            pero cariñosos, lo que los hace ideales para diversos estilos de vida.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Adoptar un gato no solo cambia su vida, sino también la tuya. Estos animales son conocidos por reducir el estrés 
            y la ansiedad en sus dueños, además de ser excelentes compañeros para personas que viven en espacios pequeños.
          </p>
        </section>

        {/* Sección de cuidados básicos */}
        <section className="mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Cuidados básicos</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Alimentación</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Ofrece alimento de calidad específico para gatos</li>
                <li>Respeta las cantidades recomendadas según su peso y edad</li>
                <li>Proporciona siempre agua fresca y limpia</li>
                <li>Evita darles alimentos tóxicos como chocolate, cebolla o uvas</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Espacio y enriquecimiento</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Proporciona rascadores para mantener sus uñas saludables</li>
                <li>Ofrece juguetes que estimulen su instinto de caza</li>
                <li>Crea espacios elevados donde puedan observar su entorno</li>
                <li>Dedica tiempo diario para jugar con tu gato</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Salud</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Visitas regulares al veterinario</li>
                <li>Vacunación y desparasitación según calendario</li>
                <li>Esterilización/castración para prevenir problemas de salud</li>
                <li>Atención a cambios en su comportamiento o hábitos</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Higiene</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Mantén limpia su caja de arena y cámbiala regularmente</li>
                <li>Cepilla su pelaje para reducir bolas de pelo</li>
                <li>Limpia sus ojos y orejas cuando sea necesario</li>
                <li>Los gatos suelen asearse solos, pero algunos necesitan ayuda</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sección de comportamiento */}
        <section className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Entendiendo el comportamiento felino</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Los gatos tienen un lenguaje corporal único. Aprender a interpretarlo te ayudará a construir una mejor relación con tu mascota.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Ronroneo</h3>
              <p className="text-gray-600 dark:text-gray-300">Generalmente indica satisfacción, pero también puede ser un mecanismo para calmarse en situaciones de estrés.</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Posición de la cola</h3>
              <p className="text-gray-600 dark:text-gray-300">Cola erguida indica confianza y saludo amistoso, mientras que una cola esponjada muestra miedo o agresión.</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg dark:bg-gray-600">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Amasado</h3>
              <p className="text-gray-600 dark:text-gray-300">Cuando "amasan" con sus patas, suelen estar contentos y relajados, un comportamiento que viene desde su etapa de lactancia.</p>
            </div>
          </div>
        </section>

        {/* Sección de razas populares */}
        <section className="mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Razas populares y sus características</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Siamés</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Inteligente, vocal y sociable. Forma fuertes vínculos con sus dueños y necesita mucha interacción.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Esperanza de vida: 12-15 años</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Maine Coon</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Grande, amigable y juguetón. Conocido como el "gigante gentil" por su tamaño y temperamento dócil.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Esperanza de vida: 12-15 años</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Ragdoll</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">Tranquilo, cariñoso y relajado. Se caracteriza por relajarse completamente cuando se le alza.</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Esperanza de vida: 12-17 años</p>
            </div>
          </div>
        </section>

        {/* Sección de adopción */}
        <section className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 rounded-xl shadow-md mb-12 fade-in dark:from-blue-700 dark:to-green-700">
          <h2 className="text-2xl font-bold mb-4">¿Listo para adoptar?</h2>
          <p className="mb-6">
            Si después de leer esta información estás decidido a adoptar un gato, te invitamos a explorar nuestros gatos disponibles 
            y encontrar a tu compañero ideal.
          </p>
          <Link 
            to="/gatos" 
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
          >
            Ver gatos disponibles
          </Link>
        </section>

        {/* Sección de mitos y realidades */}
        <section className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-700 mb-12 fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Mitos y realidades sobre los gatos</h2>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Mito: Los gatos son distantes y no se apegan a sus dueños</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Realidad: Los gatos forman vínculos profundos con sus dueños, pero expresan su afecto de manera diferente a los perros.</p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Mito: Los gatos negros traen mala suerte</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Realidad: Esta superstición ha causado que muchos gatos negros tengan dificultades para ser adoptados, pero no tiene ningún fundamento.</p>
            </div>
            
            <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">Mito: Los gatos siempre caen de pie</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">Realidad: Aunque tienen un gran reflejo de enderezamiento, no siempre logran caer correctamente y pueden sufrir lesiones graves en caídas.</p>
            </div>
          </div>
        </section>

        {/* Sección de recursos adicionales */}
        <section className="fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Recursos adicionales</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Libros recomendados</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>"El gato: Manual de usuario" por David Brunner</li>
                <li>"Piensa como tu gato" por Pam Johnson-Bennett</li>
                <li>"El lenguaje secreto de los gatos" por Susanne Schötz</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md dark:bg-gray-700">
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Sitios web útiles</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                <li>International Cat Care - consejos de salud felina</li>
                <li>The Cat Fanciers' Association - información sobre razas</li>
                <li>Jackson Galaxy - consejos de comportamiento felino</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ConocerMasGatos;