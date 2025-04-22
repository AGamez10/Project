import { useEffect } from 'react';
import Sidebar from '../pages/dashboard/Sidebar';
import DarkModeToggle from '../components/DarkModeToggle';
import { Outlet, useLocation } from 'react-router-dom';

export default function DashboardLayout() {

  const location = useLocation();

  useEffect(() => {
    const pathTitleMap = {
      'dashboard': 'Dashboard | AdoptaFácil',
    };

    const title = pathTitleMap[location.pathname] || 'AdoptaFácil';
    document.title = title;
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <DarkModeToggle />
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}