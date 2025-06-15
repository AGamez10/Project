import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import googleAuthService from '../services/googleAuth';
import apiService from '../services/api';

const GoogleSignInButton = ({ className = '', text = 'Continuar con Google' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const buttonRef = useRef(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    initializeGoogle();
  }, []);

  const initializeGoogle = async () => {
    try {
      setLoading(true);
      await googleAuthService.initialize();
      setIsGoogleLoaded(true);
      
      // Renderizar el botón después de que Google esté listo
      setTimeout(() => {
        if (buttonRef.current) {
          renderGoogleButton();
        }
      }, 100);
    } catch (error) {
      console.error('Error inicializando Google:', error);
      setError('Error al cargar Google Sign In');
    } finally {
      setLoading(false);
    }
  };

  const renderGoogleButton = async () => {
    try {
      if (!buttonRef.current) return;
      
      // Limpiar contenido anterior
      buttonRef.current.innerHTML = '';
      
      // Crear un div para el botón de Google
      const googleButtonDiv = document.createElement('div');
      googleButtonDiv.id = 'google-signin-button-' + Date.now();
      buttonRef.current.appendChild(googleButtonDiv);

      await googleAuthService.renderButton(
        googleButtonDiv.id,
        handleGoogleResponse,
        {
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          width: buttonRef.current.offsetWidth || 300
        }
      );
    } catch (error) {
      console.error('Error renderizando botón:', error);
      setError('Error al cargar el botón de Google');
    }
  };

  const handleGoogleResponse = async (response) => {
    setLoading(true);
    setError('');

    try {
      console.log('Respuesta de Google recibida:', response);

      // Decodificar el token JWT
      const userInfo = googleAuthService.parseJwt(response.credential);
      
      if (!userInfo) {
        throw new Error('Token de Google inválido');
      }

      console.log('Información del usuario:', userInfo);

      // Enviar al backend para autenticación
      const authResponse = await apiService.request('/auth/google/token', {
        method: 'POST',
        body: {
          credential: response.credential,
          user_info: userInfo
        }
      });

      console.log('Respuesta del backend:', authResponse);

      // Actualizar el contexto de autenticación
      if (authResponse.token) {
        apiService.setToken(authResponse.token);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        
        // Simular login exitoso
        await login({
          email: authResponse.user.email,
          password: 'google_oauth_dummy'
        });

        // Redirigir
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        throw new Error('No se recibió token del servidor');
      }

    } catch (err) {
      console.error('Error en autenticación con Google:', err);
      setError(err.message || 'Error al iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  const handleManualClick = async () => {
    if (loading || !isGoogleLoaded) return;

    try {
      setLoading(true);
      setError('');
      
      // Mostrar popup de Google como alternativa
      await googleAuthService.showSignInPopup(handleGoogleResponse);
    } catch (err) {
      console.error('Error en click manual:', err);
      setError('Error al mostrar Google Sign In');
      setLoading(false);
    }
  };

  if (!isGoogleLoaded && loading) {
    return (
      <div className={`w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 ${className}`}>
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 mr-2"></div>
          Cargando Google...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
          <button 
            onClick={initializeGoogle}
            className="ml-2 text-red-800 underline hover:no-underline"
          >
            Reintentar
          </button>
        </div>
      )}
      
      <div className="w-full">
        {/* Contenedor para el botón de Google */}
        <div 
          ref={buttonRef}
          className={`w-full ${className}`}
          style={{ minHeight: '44px' }}
        />
        
        {/* Botón de fallback */}
        {isGoogleLoaded && (
          <button
            onClick={handleManualClick}
            disabled={loading}
            className={`
              w-full mt-2 flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg
              bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed text-sm
            `}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                Conectando...
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Alternativa: {text}
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GoogleSignInButton;