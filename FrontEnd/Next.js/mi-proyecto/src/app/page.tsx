import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">AdoptaFácil</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Inicio</a></li>
            <li><a href="#" className="hover:underline">Adoptar</a></li>
            <li><a href="#" className="hover:underline">Refugios</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 bg-blue-500 flex items-center justify-center text-white text-center p-4">
        <h2 className="text-3xl font-bold">Encuentra a tu mejor amigo</h2>
      </section>

      {/* Buscador */}
      <div className="p-4">
        <input type="text" placeholder="Buscar una mascota..." className="w-full p-2 border rounded-lg" />
      </div>

      {/* Categorías */}
      <div className="flex justify-center space-x-4 my-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Perros</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Gatos</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Otros</button>
      </div>

      {/* Tarjetas de Mascotas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <Image src="/dog.jpg" width={300} height={200} alt="Perro" className="rounded" />
          <h3 className="text-lg font-bold mt-2">Firulais</h3>
          <p className="text-gray-600">Cachorro juguetón en busca de un hogar.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Adoptar</button>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <Image src="/cat.jpg" width={300} height={200} alt="Gato" className="rounded" />
          <h3 className="text-lg font-bold mt-2">Michi</h3>
          <p className="text-gray-600">Gato tierno y cariñoso.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Adoptar</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>© 2025 AdoptaFácil. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
