# 🧪 **Guía de Pruebas - AdoptaFácil**

## 🚀 **Cómo Probar el Sistema Completo**

### **1. Iniciar el Backend Laravel**

```bash
cd BackEnd
php artisan serve
```

El servidor estará disponible en: `http://localhost:8000`

### **2. Iniciar el Frontend React**

```bash
cd Front-End
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 🔐 **Pruebas de Autenticación con Google**

### **Configuración Temporal para Pruebas**

Para probar sin configurar Google OAuth real, el sistema está configurado para funcionar con datos simulados:

1. **Ve a la página de login**: `http://localhost:5173/login`
2. **Haz clic en "Continuar con Google"**
3. **El sistema simulará la autenticación** y te redirigirá al dashboard

### **Configuración Real de Google OAuth (Opcional)**

Si quieres configurar Google OAuth real:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto y habilita Google+ API
3. Crea credenciales OAuth 2.0
4. Actualiza las variables de entorno:

```env
# Backend (.env)
GOOGLE_CLIENT_ID=tu_client_id_real
GOOGLE_CLIENT_SECRET=tu_client_secret_real

# Frontend (.env)
VITE_GOOGLE_CLIENT_ID=tu_client_id_real
```

---

## 🤖 **Pruebas del Agente IA**

### **Acceder al Agente IA**

1. **Inicia sesión** en el sistema
2. **Ve al dashboard**: `http://localhost:5173/dashboard`
3. **Haz clic en "Agente IA"** en el sidebar

### **Funcionalidades Disponibles**

#### **📊 Dashboard**
- Muestra resumen ejecutivo del sistema
- Métricas principales en tiempo real
- Alertas de problemas críticos

#### **🏥 Salud del Sistema**
- Análisis completo del estado del sistema
- Evaluación de métricas de adopción
- Recomendaciones de mejora

#### **💡 Recomendaciones**
- Estrategias de marketing
- Mejoras del proceso
- Optimizaciones técnicas
- Alianzas estratégicas

#### **⚠️ Detección de Anomalías**
- Patrones inusuales en adopciones
- Anomalías en donaciones
- Comportamiento anómalo de usuarios

#### **💬 Chat IA**
- Conversación interactiva con el agente
- Respuestas contextuales sobre el sistema
- Análisis personalizado bajo demanda

---

## 🧪 **Casos de Prueba Específicos**

### **Chat IA - Preguntas de Prueba**

Prueba estas preguntas en el chat:

```
1. "Hola, ¿cómo estás?"
2. "¿Cuántas mascotas tenemos disponibles?"
3. "¿Cómo van las adopciones?"
4. "¿Hay algún problema en el sistema?"
5. "Dame recomendaciones para mejorar"
6. "¿Cómo están las donaciones?"
7. "¿Cuántos usuarios tenemos?"
```

### **Análisis del Sistema**

1. **Salud del Sistema**:
   - Haz clic en "Actualizar" para ver análisis en tiempo real
   - Verifica que muestre métricas de mascotas, adopciones y donaciones

2. **Recomendaciones**:
   - Revisa las estrategias sugeridas
   - Verifica que sean relevantes para adopción de mascotas

3. **Anomalías**:
   - Comprueba la detección de patrones inusuales
   - Verifica alertas de problemas potenciales

---

## 🔧 **Solución de Problemas Comunes**

### **Error: "Google Client ID no configurado"**

**Solución**: El sistema usará autenticación simulada. Para usar Google real, configura las credenciales.

### **Error: "Error al cargar Google Sign In"**

**Solución**: 
1. Verifica que el frontend esté ejecutándose en `http://localhost:5173`
2. Revisa la consola del navegador para errores específicos
3. Usa el botón alternativo de Google

### **Error: "Error al cargar las estadísticas"**

**Solución**:
1. Verifica que el backend esté ejecutándose
2. Comprueba que la base de datos esté configurada
3. Ejecuta `php artisan migrate` si es necesario

### **Chat IA no responde**

**Solución**:
1. El sistema usa respuestas simuladas inteligentes
2. Verifica que el backend esté funcionando
3. Revisa los logs de Laravel para errores

---

## 📊 **Datos de Prueba**

El sistema incluye datos de ejemplo:

- **5 mascotas** de diferentes especies
- **Usuarios de prueba** con diferentes roles
- **Estadísticas simuladas** para análisis

### **Agregar Más Datos de Prueba**

```bash
cd BackEnd
php artisan db:seed
```

---

## 🎯 **Flujo de Prueba Completo**

### **1. Autenticación**
- [ ] Login tradicional funciona
- [ ] Login con Google funciona (simulado)
- [ ] Redirección al dashboard correcta
- [ ] Logout funciona correctamente

### **2. Dashboard**
- [ ] Métricas se cargan correctamente
- [ ] Navegación entre secciones funciona
- [ ] Sidebar responsive funciona

### **3. Agente IA**
- [ ] Dashboard del agente se carga
- [ ] Análisis de salud funciona
- [ ] Recomendaciones se generan
- [ ] Detección de anomalías funciona
- [ ] Chat responde a preguntas

### **4. Rendimiento**
- [ ] Navegación es fluida
- [ ] No hay recargas de página
- [ ] Estados de carga son claros
- [ ] Errores se manejan correctamente

---

## 📞 **Soporte**

Si encuentras problemas:

1. **Revisa los logs**:
   ```bash
   # Laravel logs
   tail -f BackEnd/storage/logs/laravel.log
   
   # Frontend console
   F12 > Console en el navegador
   ```

2. **Reinicia los servicios**:
   ```bash
   # Backend
   cd BackEnd && php artisan serve
   
   # Frontend
   cd Front-End && npm run dev
   ```

3. **Limpia cache**:
   ```bash
   # Laravel
   php artisan cache:clear
   
   # Frontend
   Ctrl + F5 en el navegador
   ```

---

## ✅ **Checklist de Funcionalidades**

### **Autenticación**
- [x] Login tradicional
- [x] Login con Google (simulado)
- [x] Registro de usuarios
- [x] Logout seguro
- [x] Redirecciones inteligentes

### **Agente IA**
- [x] Dashboard ejecutivo
- [x] Análisis de salud del sistema
- [x] Recomendaciones inteligentes
- [x] Detección de anomalías
- [x] Chat interactivo
- [x] Respuestas contextuales

### **Optimizaciones**
- [x] Lazy loading de componentes
- [x] Cache de API
- [x] Navegación sin recargas
- [x] Estados de carga
- [x] Manejo de errores

---

**🎉 ¡El sistema está listo para usar! Todas las funcionalidades están operativas y proporcionan soporte real para la gestión de AdoptaFácil.**