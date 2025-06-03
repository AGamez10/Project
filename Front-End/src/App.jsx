import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Dash from "./pages/dashboard/Dash";
import Error404 from "./pages/errores/Error404";
import Error500 from "./pages/errores/Error500";
import Login from "./pages/ingreso/Login";
import RegisterPage from "./pages/registro/Register";
import TermsAndConditions from "./pages/tyc/tyc";
import StartLayout from "./layouts/StartLayout";
import Main from "./pages/inicio/Main.jsx";
import Perros from "./pages/inicio/Perros.jsx";
import RegistroOpciones from "./pages/registro/RegistroOpciones";
import ConocerMas from "./pages/conocer-mas/ConocerMas.jsx";
import PerfilUsuario from "./pages/perfil/PerfilUsuario";
import DetalleMascota from "./pages/mascotas/DetalleMascota";
import AdminPanel from "./pages/admin/AdminPanel";
import Contacto from "./pages/contacto/Contacto";
import FavoritePets from "./pages/dashboard/FavoritePets";
import Donaciones from "./pages/donaciones/Donaciones";
import PendingRequests from "./pages/dashboard/PendingRequests";
import NotificationsPanel from "./pages/dashboard/NotificationsPanel";
import AdoptionStats from "./pages/dashboard/AdoptionStats";
import AdoptionMap from "./pages/dashboard/AdoptionMap";
import DonationsSummary from "./pages/dashboard/DonationsSummary";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta que usa el layout */}
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Dash />} />
            <Route path="favoritos" element={<FavoritePets />} />
            <Route path="solicitudes" element={<PendingRequests />} />
            <Route path="notificaciones" element={<NotificationsPanel />} />
            <Route path="estadisticas" element={<AdoptionStats />} />
            <Route path="mapa" element={<AdoptionMap />} />
            <Route path="donaciones" element={<DonationsSummary />} />
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
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
