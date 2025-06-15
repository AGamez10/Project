/**
 * Servicio simplificado de autenticación con Google
 */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id';

class GoogleAuthService {
  constructor() {
    this.isInitialized = false;
  }

  /**
   * Inicializar Google Identity Services
   */
  async initialize() {
    if (this.isInitialized) return Promise.resolve();

    return new Promise((resolve, reject) => {
      // Verificar si ya está cargado
      if (window.google?.accounts?.id) {
        this.isInitialized = true;
        resolve();
        return;
      }

      // Cargar script de Google Identity
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        // Esperar a que Google esté disponible
        const checkGoogle = () => {
          if (window.google?.accounts?.id) {
            this.isInitialized = true;
            resolve();
          } else {
            setTimeout(checkGoogle, 100);
          }
        };
        checkGoogle();
      };
      
      script.onerror = () => {
        reject(new Error('Error al cargar Google Identity Services'));
      };
      
      document.head.appendChild(script);
    });
  }

  /**
   * Inicializar Google con callback
   */
  async initializeWithCallback(callback) {
    await this.initialize();
    
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === 'your_google_client_id') {
      throw new Error('Google Client ID no configurado');
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: callback,
      auto_select: false,
      cancel_on_tap_outside: true
    });
  }

  /**
   * Mostrar popup de Google Sign In
   */
  async showSignInPopup(callback) {
    try {
      await this.initializeWithCallback(callback);
      
      // Mostrar el prompt de One Tap
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log('One Tap no se mostró, usando método alternativo');
        }
      });
    } catch (error) {
      console.error('Error en Google Sign In:', error);
      throw error;
    }
  }

  /**
   * Renderizar botón de Google
   */
  async renderButton(elementId, callback, options = {}) {
    try {
      await this.initializeWithCallback(callback);
      
      const defaultOptions = {
        theme: 'outline',
        size: 'large',
        text: 'signin_with',
        shape: 'rectangular',
        logo_alignment: 'left',
        width: '100%'
      };

      const buttonOptions = { ...defaultOptions, ...options };
      
      window.google.accounts.id.renderButton(
        document.getElementById(elementId),
        buttonOptions
      );
    } catch (error) {
      console.error('Error renderizando botón de Google:', error);
      throw error;
    }
  }

  /**
   * Decodificar JWT token de Google
   */
  parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return null;
    }
  }

  /**
   * Cerrar sesión de Google
   */
  async signOut() {
    try {
      if (this.isInitialized && window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (error) {
      console.error('Error en Google Sign Out:', error);
    }
  }
}

export default new GoogleAuthService();