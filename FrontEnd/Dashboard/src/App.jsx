import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { ParticlesBackground } from './components/ParticlesBackground'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Verificar preferencia del usuario
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const currentTheme = localStorage.getItem('theme')
    
    // Aplicar tema inicial
    if (currentTheme === 'dark' || (!currentTheme && userPrefersDark)) {
      document.documentElement.classList.add('dark')
      setDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => {
    const html = document.documentElement
    html.classList.toggle('dark')
    
    if (html.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    } else {
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark transition-colors duration-200">
      <ParticlesBackground />
      <Sidebar darkMode={darkMode} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Dashboard />
      </div>
    </div>
  )
}

export default App