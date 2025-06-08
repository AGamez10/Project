import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../../components/ParticlesBackground';

// Componente auxiliar para secciones
const Section = ({ title, content }) => (
  <div className="mb-6">
    <h4 className="text-xl font-semibold mb-2 text-green-800">{title}</h4>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </div>
);

const TermsAndConditions = () => {
    useEffect(() => {
        document.title = "Terminos y condiciones | AdoptaFácil";
      }, []);
      
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative p-5 bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 overflow-auto">
      <ParticlesBackground />
      
      <div className="max-w-4xl w-full z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-700 to-blue-800 dark:from-green-300 dark:to-blue-300 bg-clip-text text-transparent">
          Términos y Condiciones de Uso
        </h1>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
          <Section 
            title="1. Aceptación de los Términos"
            content="Al acceder y utilizar este sistema (en adelante, la 'Plataforma'), el usuario acepta cumplir con estos Términos y Condiciones, así como con las políticas de privacidad y normas aplicables. Si no está de acuerdo, debe abstenerse de usar el servicio."
          />
          
          <Section 
            title="2. Objeto de la Plataforma"
            content={
              <>
                La Plataforma tiene como finalidad:
                <br /> - Facilitar la adopción responsable de animales en situación de abandono.
                <br /> - Permitir donaciones económicas o en especie para el cuidado de los animales.
                <br /> - Brindar información sobre el proceso de adopción y seguimiento post-adopción.
              </>
            }
          />
          
          <Section 
            title="3. Requisitos para la Adopción"
            content={
              <>
                3.1. El adoptante debe ser mayor de edad (o contar con autorización legal).
                <br /> 3.2. Debe proporcionar información veraz y comprometerse a brindar cuidados adecuados al animal.
                <br /> 3.3. La Plataforma puede requerir una visita domiciliaria o entrevista para validar la idoneidad del adoptante.
                <br /> 3.4. La entidad administradora se reserva el derecho de rechazar una adopción si considera que no se cumplen las condiciones necesarias.
              </>
            }
          />
          
          <Section 
            title="4. Proceso de Donaciones"
            content={
              <>
                4.1. Las donaciones pueden ser monetarias o en especie (alimentos, medicinas, etc.).
                <br />4.2. Los fondos recaudados se destinarán exclusivamente al cuidado de los animales y mantenimiento de la Plataforma.
                <br />4.3. Las donaciones no son reembolsables, salvo error técnico comprobado.
              </>
            }
          />
          
          <Section 
            title="5. Responsabilidad del Usuario"
            content={
              <>
                5.1. Proporcionar información real y actualizada.
                <br />5.2. No utilizar la Plataforma con fines fraudulentos o ilegales.
                <br />5.3. Responsabilizarse del animal adoptado, garantizando su bienestar.
                <br />5.4. Reportar cualquier irregularidad o maltrato detectado.
              </>
            }
          />
          
          <Section 
            title="6. Limitación de Responsabilidad"
            content={
              <>
                6.1. La Plataforma no garantiza la disponibilidad permanente del servicio.
                <br />6.2. No se hace responsable por daños o perjuicios derivados del uso indebido por parte de los usuarios.
                <br />6.3. Los animales son entregados en las condiciones de salud conocidas al momento de la adopción, sin garantías adicionales implícitas.
              </>
            }
          />
          
          <Section 
            title="7. Privacidad y Protección de Datos"
            content={
              <>
                7.1. Los datos personales serán tratados conforme a la política de privacidad y la legislación aplicable.
                <br />7.2. La información proporcionada no será compartida con terceros sin consentimiento, salvo obligación legal.
              </>
            }
          />
          
          <Section 
            title="8. Modificaciones"
            content="La Plataforma puede actualizar estos términos en cualquier momento, notificando a los usuarios mediante publicación en el sitio web o por correo electrónico."
          />
          
          <Section 
            title="9. Ley Aplicable y Jurisdicción"
            content="Cualquier disputa se resolverá conforme a las leyes de Colombia, sometiéndose a los tribunales competentes."
          />
          
          <div className="mt-8 text-center">
            <Link 
              to="/register"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;