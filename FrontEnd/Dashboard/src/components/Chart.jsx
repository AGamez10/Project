import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function Chart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1a202c',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1a202c',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#e2e8f0' : '#1a202c',
        },
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  }

  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril']
  const data = {
    labels,
    datasets: [
      {
        label: 'Perros',
        data: [56, 55, 60, 70, 75],
        backgroundColor: 'rgba(37, 99, 235, 0.7)',
      },
      {
        label: 'Gatos',
        data: [35, 40, 45, 50, 55],
        backgroundColor: 'rgba(22, 163, 74, 0.7)',
      },
      {
        label: 'Otros',
        data: [15, 18, 20, 22, 25, 28],
        backgroundColor: 'rgba(124, 58, 237, 0.7)',
      },
    ],
  }

  return <Bar options={options} data={data} />
}