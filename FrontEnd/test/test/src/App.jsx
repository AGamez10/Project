import { useState } from 'react'
import './App.css'
import DogCarousel from './components/DogCarousel'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">ADOPTAFÁCIL</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">ADOPTAR</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">DONAR</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">TESTIMONIOS</a>
          </nav>
        </div>
      </header>
      
      <main>
        <DogCarousel />
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ADOPTAFÁCIL</h3>
              <p className="text-gray-400">Conectando mascotas con hogares amorosos desde 2023.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enlaces útiles</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Cómo adoptar</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Preguntas frecuentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">info@adoptafacil.com</li>
                <li className="text-gray-400">+1 234 567 890</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Adoptafácil. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
