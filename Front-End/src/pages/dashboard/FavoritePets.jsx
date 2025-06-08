export default function FavoritePets() {
  const favorites = [
    {
      id: 1,
      name: "Max",
      type: "Perro",
      breed: "Labrador Mix",
      age: "2 años",
      image:
        "https://c4.wallpaperflare.com/wallpaper/82/412/1020/aleman-bosque-pastor-perro-wallpaper-preview.jpg",
      status: "Disponible",
    },
    {
      id: 2,
      name: "Luna",
      type: "Gato",
      breed: "Siamés",
      age: "1 año",
      image:
        "https://c4.wallpaperflare.com/wallpaper/26/58/362/animales-corre-hierba-perro-wallpaper-preview.jpg",
      status: "Disponible",
    },
    {
      id: 3,
      name: "Rocky",
      type: "Perro",
      breed: "Pastor Alemán",
      age: "3 años",
      image:
        "https://cdn.pixabay.com/video/2024/03/01/202576-918431455_tiny.jpg",
      status: "En proceso",
    },
  ];

  return (
    <div className="flex-auto md:px-52 p-8 fade-in overflow-y-auto">
      <h2 className="text-lg font-semibold text-white dark:text-gray-200 mb-6">
        Mascotas Favoritas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.map((pet) => (
          <div
            key={pet.id}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-40">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    pet.status === "Disponible"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                  }`}
                >
                  {pet.status}
                </span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {pet.name}
              </h3>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                <p>
                  {pet.breed} • {pet.age}
                </p>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {pet.type}
                </span>
                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {favorites.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No has agregado mascotas a favoritos.
          </p>
          <button className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
            Explorar mascotas
          </button>
        </div>
      )}
    </div>
  );
}
