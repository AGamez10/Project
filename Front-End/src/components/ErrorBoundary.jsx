import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log del error para monitoreo
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-400 to-red-600">
          <div className="text-center text-white p-8 max-w-md">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold mb-4">¡Oops! Algo salió mal</h1>
            <p className="mb-6">
              Ha ocurrido un error inesperado. Por favor, recarga la página o contacta al soporte.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Recargar Página
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-red-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors"
              >
                Volver Atrás
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left bg-red-700 p-4 rounded">
                <summary className="cursor-pointer font-semibold">
                  Detalles del Error (Desarrollo)
                </summary>
                <pre className="mt-2 text-xs overflow-auto">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;