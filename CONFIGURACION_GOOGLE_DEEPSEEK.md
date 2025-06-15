# 🔧 **Configuración de Google OAuth y DeepSeek AI**

## 📋 **Resumen**

Esta guía te ayudará a configurar la autenticación con Google y la integración con DeepSeek AI para el agente inteligente en AdoptaFácil.

---

## 🔐 **Configuración de Google OAuth**

### **1. Crear Proyecto en Google Cloud Console**

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API** y **Google Identity API**

### **2. Configurar OAuth 2.0**

1. Ve a **APIs & Services > Credentials**
2. Haz clic en **Create Credentials > OAuth 2.0 Client IDs**
3. Configura los siguientes campos:

```
Application type: Web application
Name: AdoptaFácil
Authorized JavaScript origins:
  - http://localhost:5173
  - http://localhost:3000
  - https://tu-dominio.com

Authorized redirect URIs:
  - http://localhost:8000/auth/google/callback
  - https://tu-dominio.com/auth/google/callback
```

### **3. Obtener Credenciales**

Después de crear el cliente OAuth, obtendrás:
- **Client ID**: `123456789-abcdefghijklmnop.apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-abcdefghijklmnopqrstuvwxyz`

### **4. Configurar Variables de Entorno**

#### **Backend (.env)**
```env
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback
```

#### **Frontend (.env)**
```env
VITE_GOOGLE_CLIENT_ID=tu_google_client_id
```

---

## 🤖 **Configuración de DeepSeek AI**

### **1. Obtener API Key de DeepSeek**

1. Ve a [DeepSeek Platform](https://platform.deepseek.com/)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys** en tu dashboard
4. Genera una nueva API key

### **2. Configurar Variables de Entorno**

#### **Backend (.env)**
```env
DEEPSEEK_API_KEY=tu_deepseek_api_key
DEEPSEEK_API_URL=https://api.deepseek.com/v1
```

### **3. Verificar Configuración**

Puedes probar la conexión con DeepSeek usando curl:

```bash
curl -X POST "https://api.deepseek.com/v1/chat/completions" \
  -H "Authorization: Bearer tu_deepseek_api_key" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {
        "role": "user",
        "content": "Hola, ¿cómo estás?"
      }
    ]
  }'
```

---

## 🚀 **Instalación y Configuración**

### **1. Backend Laravel**

```bash
cd BackEnd

# Instalar dependencias
composer install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar migraciones
php artisan migrate

# Iniciar servidor
php artisan serve
```

### **2. Frontend React**

```bash
cd Front-End

# Instalar dependencias
npm install

# Configurar variables de entorno
echo "VITE_API_URL=http://localhost:8000/api" > .env
echo "VITE_GOOGLE_CLIENT_ID=tu_google_client_id" >> .env

# Iniciar servidor
npm run dev
```

---

## 🔧 **Funcionalidades Implementadas**

### **Google OAuth**

#### **Backend**
- ✅ Controlador `GoogleAuthController`
- ✅ Rutas de autenticación (`/auth/google`, `/auth/google/callback`)
- ✅ Integración con Laravel Socialite
- ✅ Creación automática de usuarios
- ✅ Generación de tokens Sanctum

#### **Frontend**
- ✅ Servicio `googleAuthService`
- ✅ Componente `GoogleSignInButton`
- ✅ Integración con Google Identity Services
- ✅ Manejo de tokens y redirecciones

### **DeepSeek AI Agent**

#### **Backend**
- ✅ Controlador `DeepSeekController`
- ✅ Análisis de salud del sistema
- ✅ Recomendaciones de optimización
- ✅ Detección de anomalías
- ✅ Chat interactivo con IA

#### **Frontend**
- ✅ Servicio `deepseekService`
- ✅ Componente `AIAgent`
- ✅ Dashboard de monitoreo
- ✅ Chat en tiempo real
- ✅ Visualización de análisis

---

## 📊 **Endpoints de la API**

### **Autenticación con Google**
```
GET  /api/auth/google                 # Redirigir a Google
GET  /api/auth/google/callback        # Callback de Google
POST /api/auth/google/token           # Autenticar con token
```

### **Agente DeepSeek**
```
GET  /api/ai-agent/system-health           # Análisis de salud
GET  /api/ai-agent/adoption-recommendations # Recomendaciones
GET  /api/ai-agent/detect-anomalies        # Detectar anomalías
POST /api/ai-agent/chat                    # Chat con IA
```

---

## 🎯 **Casos de Uso del Agente IA**

### **1. Monitoreo del Sistema**
- Análisis de métricas en tiempo real
- Detección de problemas de rendimiento
- Alertas automáticas de anomalías

### **2. Optimización de Adopciones**
- Análisis de patrones de adopción
- Recomendaciones para mejorar tasas de éxito
- Identificación de mascotas con mayor demanda

### **3. Asistente Inteligente**
- Respuestas a preguntas sobre el sistema
- Análisis de datos específicos
- Generación de reportes automáticos

---

## 🔒 **Seguridad y Mejores Prácticas**

### **Google OAuth**
- ✅ Validación de tokens en el servidor
- ✅ Almacenamiento seguro de credenciales
- ✅ Manejo de errores y timeouts
- ✅ Revocación de tokens al logout

### **DeepSeek AI**
- ✅ API key protegida en variables de entorno
- ✅ Rate limiting para evitar abuso
- ✅ Validación de entrada del usuario
- ✅ Logs de seguridad para auditoría

---

## 🐛 **Troubleshooting**

### **Problemas Comunes con Google OAuth**

#### **Error: "redirect_uri_mismatch"**
```
Solución: Verificar que las URIs de redirección en Google Cloud Console 
coincidan exactamente con las configuradas en tu aplicación.
```

#### **Error: "invalid_client"**
```
Solución: Verificar que el GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET 
sean correctos y estén configurados en el .env
```

### **Problemas Comunes con DeepSeek**

#### **Error: "Unauthorized"**
```
Solución: Verificar que la DEEPSEEK_API_KEY sea válida y tenga 
permisos suficientes.
```

#### **Error: "Rate limit exceeded"**
```
Solución: Implementar throttling en el frontend o esperar antes 
de hacer nuevas peticiones.
```

---

## 📈 **Monitoreo y Logs**

### **Logs del Sistema**
```bash
# Ver logs de Laravel
tail -f storage/logs/laravel.log

# Ver logs específicos de DeepSeek
grep "DeepSeek" storage/logs/laravel.log

# Ver logs de autenticación
grep "GoogleAuth" storage/logs/laravel.log
```

### **Métricas a Monitorear**
- Número de autenticaciones con Google por día
- Tiempo de respuesta de DeepSeek API
- Errores de autenticación
- Uso de tokens de API

---

## 🔄 **Actualizaciones y Mantenimiento**

### **Rotación de API Keys**
1. Generar nueva API key en DeepSeek
2. Actualizar variable de entorno
3. Reiniciar servidor Laravel
4. Verificar funcionamiento

### **Actualización de Credenciales Google**
1. Generar nuevas credenciales en Google Cloud Console
2. Actualizar variables de entorno
3. Probar flujo de autenticación
4. Revocar credenciales antiguas

---

## 📞 **Soporte**

### **Recursos Útiles**
- [Documentación Google OAuth](https://developers.google.com/identity/protocols/oauth2)
- [Documentación DeepSeek API](https://platform.deepseek.com/api-docs)
- [Laravel Socialite](https://laravel.com/docs/socialite)

### **Contacto**
- **Email**: soporte@adoptafacil.com
- **GitHub Issues**: [Reportar problemas]
- **Documentación**: Ver archivos README

---

**🔐 ¡Configuración completada! Tu sistema ahora tiene autenticación con Google y un agente inteligente DeepSeek funcionando.**