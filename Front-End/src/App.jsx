import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy loading de componentes
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const Dash = lazy(() => import("./pages/dashboard/Dash"));
const Error404 = lazy(() => import("./pages/errores/Error404"));
const Error500 = lazy(() => import("./pages/errores/Error500"));
const Login = lazy(() => import("./pages/ingreso/Login"));
const RegisterPage = lazy(() => import("./pages/registro/Register"));
const TermsAndConditions = lazy(() => import("./pages/tyc/tyc"));
const StartLayout = lazy(() => import("./layouts/StartLayout"));
const Main = lazy(() => import("./pages/inicio/Main.jsx"));
const Perros = lazy(() => import("./pages/inicio/Perros.jsx"));
const RegistroOpciones = lazy(() => import("./pages/registro/RegistroOpciones"));
const ConocerMas = lazy(() => import("./pages/conocer-mas/ConocerMas.jsx"));
const PerfilUsuario = lazy(() => import("./pages/perfil/PerfilUsuario"));
const DetalleMascota = lazy(() => import("./pages/mascotas/DetalleMascota"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));
const Contacto = lazy(() => import("./pages/contacto/Contacto"));
const FavoritePets = lazy(() => import("./pages/dashboard/FavoritePets"));
const Donaciones = lazy(() => import("./pages/donaciones/Donaciones"));
const PendingRequests = lazy(() => import("./pages/dashboard/PendingRequests"));
const NotificationsPanel = lazy(() => import("./pages/dashboard/NotificationsPanel"));
const AdoptionStats = lazy(() => import("./pages/dashboard/AdoptionStats"));
const AdoptionMap = lazy(() => import("./pages/dashboard/AdoptionMap"));
const DonationsSummary = lazy(() => import("./pages/dashboard/DonationsSummary"));
const AIAgent = lazy(() => import("./components/AIAgent"));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
          {/* Ruta que usa el layout */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dash />} />
            <Route path="favoritos" element={<FavoritePets />} />
            <Route path="solicitudes" element={<PendingRequests />} />
            <Route path="notificaciones" element={<NotificationsPanel />} />
            <Route path="estadisticas" element={<AdoptionStats />} />
            <Route path="mapa" element={<AdoptionMap />} />
            <Route path="donaciones" element={<DonationsSummary />} />
            <Route path="ai-agent" element={<AIAgent />} />
          </Route>
          {/* Ruta que usa el Inicio */}
          <Route path="/" element={<StartLayout />}>
            <Route index element={<Main />} />
            <Route path="perros" element={<Perros />} />
          </Route>
          <Route path="error404" element={<Error404 />} />
          <Route path="error500" element={<Error500 />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="registro-opciones" element={<RegistroOpciones />} />
          <Route path="conocer-mas" element={<ConocerMas />} />{" "}
          <Route path="tyc" element={<TermsAndConditions />} />
          <Route path="mascota/:id" element={<DetalleMascota />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="donaciones" element={<Donaciones />} />
          <Route path="perfil" element={<PerfilUsuario />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
