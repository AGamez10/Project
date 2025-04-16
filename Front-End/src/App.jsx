import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dash from './pages/dashboard/Dash';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta padre que usa el layout */}
          <Route path="/" element={<DashboardLayout />}>
            {/* Ruta para la raíz */}
            <Route index element={<Dash />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;