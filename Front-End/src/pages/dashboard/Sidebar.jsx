import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../public/Logo.png";
import LogoWhite from "../../../public/LogoWhite.png";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-white dark:bg-gray-800 shadow-md transition-all duration-300 z-20 relative`}
    >
      <div className="flex flex-col h-full">
        {/* Botón para colapsar/expandir */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-12 top-20 bg-blue-600 text-white p-1 rounded-full shadow-lg transform translate-x-full hover:bg-blue-700 transition-colors"
        >
          {collapsed ? (
            <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center py-5 border-b border-gray-200 dark:border-gray-700">
          {/* Logo para modo claro - visible solo en light */}
          <img
            src={Logo}
            alt="LogoLight"
            className="h-12 w-auto block dark:hidden"
          />
          {/* Logo para modo oscuro - visible solo en dark */}
          <img
            src={LogoWhite}
            alt="LogoDark"
            className="h-12 w-auto hidden dark:block"
          />
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 overflow-y-auto py-7">
          <ul className="space-y-2 px-3">
            {[
              {
                name: "Dashboard",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                link: "/dashboard",
              },
              {
                name: "Favoritos",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                link: "/dashboard/favoritos",
              },
              {
                name: "Solicitudes",
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
                link: "/dashboard/solicitudes",
              },
              {
                name: "Notificaciones",
                icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
                link: "/dashboard/notificaciones",
              },
              {
                name: "Estadísticas",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                link: "/dashboard/estadisticas",
              },
              {
                name: "Mapa",
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                link: "/dashboard/mapa",
              },
              {
                name: "Donaciones",
                icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
                link: "/dashboard/donaciones",
              },
              {
                name: "Configuración",
                icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
                link: "/dashboard/perfil",
              },
            ].map((item, index) => (
              <li
                key={index}
                className={collapsed ? "flex justify-center" : ""}
              >
                <Link
                  to={item.link}
                  onClick={() => setActiveItem(item.name)}
                  className={`flex items-center p-2 rounded-lg ${
                    activeItem === item.name
                      ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    />
                  </svg>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Perfil de usuario */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="data:image/jpeg;base64,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"
                alt="Usuario"
              />
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Admin
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  admin@adoptafacil.com
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
