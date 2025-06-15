const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
        <p className="text-white text-lg font-medium">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;