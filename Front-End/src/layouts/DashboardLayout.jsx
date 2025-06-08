import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../pages/dashboard/Sidebar";
import DarkModeToggle from "../components/DarkModeToggle";
import ParticlesBackground from "../components/ParticlesBackground";

export default function DashboardLayout() {
  const location = useLocation();

  useEffect(() => {
    const pathTitleMap = {
      "/dashboard": "Dashboard | AdoptaFácil",
      "/dashboard/home": "Dashboard | AdoptaFácil",
      "/dashboard/favoritos": "Favoritos | AdoptaFácil",
      "/dashboard/solicitudes": "Solicitudes | AdoptaFácil",
      "/dashboard/notificaciones": "Notificaciones | AdoptaFácil",
      "/dashboard/estadisticas": "Estadísticas | AdoptaFácil",
      "/dashboard/mapa": "Mapa Adopciones | AdoptaFácil",
      "/dashboard/donaciones": "Resumen Donaciones | AdoptaFácil",
    };

    const title = pathTitleMap[location.pathname] || "AdoptaFácil";
    document.title = title;
  }, [location.pathname]);

  return (
    <div className="relative flex h-screen bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 transition-colors duration-200">
      <ParticlesBackground />
      <DarkModeToggle />
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
