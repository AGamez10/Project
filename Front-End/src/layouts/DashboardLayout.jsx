import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ParticlesBackground from '../components/ParticlesBackground';
import Sidebar from '../pages/dashboard/Sidebar';
import Header from '../pages/dashboard/Header';

export default function DashboardLayout() {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const pathTitleMap = {
      'dashboard': 'Dashboard | AdoptaFácil',
    };

    const title = pathTitleMap[location.pathname] || 'AdoptaFácil';
    document.title = title;
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark transition-colors duration-200">
      <ParticlesBackground />
      <Sidebar darkMode={darkMode} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Outlet />
      </div>
    </div>
  );
}