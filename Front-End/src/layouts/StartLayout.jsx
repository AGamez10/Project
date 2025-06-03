import DarkModeToggle from "../components/DarkModeToggle";
import Footer from "../pages/inicio/Footer";
import Header from "../pages/inicio/Header";
import ParticlesBackground from "../components/ParticlesBackground";
import { Outlet } from "react-router-dom";

const StartLayout = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-r from-green-400 to-blue-500 dark:from-green-600 dark:to-blue-700 transition-colors duration-200">
      <ParticlesBackground />
      <DarkModeToggle />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default StartLayout;
