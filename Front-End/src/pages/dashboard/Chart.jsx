// Importaciones básicas de React y Chart.js
import React, { useEffect, useState } from 'react'; // Hooks de React
import { Bar } from 'react-chartjs-2'; // Componente de gráfico de barras
import {
  Chart as ChartJS,
  CategoryScale,    // Escala para ejes categóricos (como meses)
  LinearScale,     // Escala para valores numéricos
  BarElement,      // Elemento visual de las barras
  Title,           // Para títulos del gráfico
  Tooltip,         // Para tooltips al pasar el mouse
  Legend,          // Para la leyenda del gráfico
} from 'chart.js';

// Registro de componentes necesarios de Chart.js
// Esto es requerido para que funcione el gráfico
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Componente principal del gráfico
export function Chart() {
  // Estado para controlar el modo oscuro/claro
  const [isDarkMode, setIsDarkMode] = useState(
    // Verifica si el elemento HTML tiene la clase 'dark' al cargar
    document.documentElement.classList.contains('dark')
  );

  // Efecto para observar cambios en el tema
  useEffect(() => {
    // Crea un observador de mutaciones del DOM
    const observer = new MutationObserver(() => {
      // Actualiza el estado cuando cambia la clase 'dark'
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    // Configura el observador para mirar cambios en los atributos de clase
    observer.observe(document.documentElement, {
      attributes: true,          // Observar cambios en atributos
      attributeFilter: ['class'] // Solo observar cambios en la clase
    });

    // Limpieza: desconecta el observador al desmontar el componente
    return () => observer.disconnect();
  }, []); // Array de dependencias vacío = se ejecuta solo al montar

  // Opciones de configuración del gráfico
  const options = {
    responsive: true, // Hace el gráfico adaptable al tamaño del contenedor
    plugins: {
      legend: {
        position: 'top', // Posición de la leyenda
        labels: {
          // Color del texto de la leyenda según el tema
          color: isDarkMode ? '#e2e8f0' : '#1a202c',
        },
      },
      title: {
        display: true, // Muestra el título
        text: 'Adopciones por Mes', // Texto del título
        // Color del título según el tema
        color: isDarkMode ? '#e2e8f0' : '#1a202c',
      },
    },
    scales: {
      // Configuración del eje Y (vertical)
      y: {
        ticks: {
          // Color de las etiquetas numéricas
          color: isDarkMode ? '#e2e8f0' : '#1a202c',
        },
        grid: {
          // Color de las líneas de la cuadrícula
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      // Configuración del eje X (horizontal)
      x: {
        ticks: {
          color: isDarkMode ? '#e2e8f0' : '#1a202c',
        },
        grid: {
          color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  // Datos del gráfico
  const labels = ['Enero', 'Febrero', 'Marzo'];
  const data = {
    labels, // Etiquetas del eje X
    datasets: [
      {
        label: 'Perros', // Nombre en la leyenda
        data: [56, 55, 60, 70, 75, 80], // Valores para cada mes
        backgroundColor: 'rgba(37, 99, 235, 0.7)', // Color de relleno
        borderColor: 'rgba(37, 99, 235, 1)', // Color del borde
        borderWidth: 1, // Grosor del borde
      },
      {
        label: 'Gatos',
        data: [35, 40, 45, 50, 55, 60],
        backgroundColor: 'rgba(22, 163, 74, 0.7)',
        borderColor: 'rgba(22, 163, 74, 1)',
        borderWidth: 1,
      },
      {
        label: 'Otros',
        data: [15, 18, 20, 22, 25, 28],
        backgroundColor: 'rgba(124, 58, 237, 0.7)',
        borderColor: 'rgba(124, 58, 237, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Renderiza el componente Bar con las opciones y datos configurados
  return <Bar options={options} data={data} />;
}
