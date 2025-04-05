import { useState, useEffect } from 'react';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Verificar el tema inicial
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);

    // Crear un evento personalizado para notificar cambios en el tema
    const darkModeEvent = new Event('darkModeChanged');

    // Función para cambiar el tema
    const toggleDarkMode = () => {
      document.documentElement.classList.toggle('dark');
      setIsDarkMode(!isDarkMode);
      document.dispatchEvent(darkModeEvent);
    };

    // Agregar el botón de cambio de tema al DOM
    const darkModeButton = document.getElementById('darkModeToggle');
    if (darkModeButton) {
      darkModeButton.addEventListener('click', toggleDarkMode);
    }

    return () => {
      if (darkModeButton) {
        darkModeButton.removeEventListener('click', toggleDarkMode);
      }
    };
  }, [isDarkMode]);

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <ParticlesBackground />
      {/* Aquí puedes agregar el resto de los componentes de tu aplicación */}
    </div>
  );
}

export default App;