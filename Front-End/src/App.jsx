import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dash from './pages/dashboard/Dash';
import Error404 from './pages/errores/Error404';
import Error500 from './pages/errores/Error500';
import Login from './pages/ingreso/Login';
import RegisterPage from './pages/registro/register';
import TermsAndConditions from './pages/tyc/tyc';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta padre que usa el layout */}
          <Route path="dashboard" element={<DashboardLayout />}>
            {/* Ruta hija para la raíz */}
            <Route index element={<Dash />} />
          </Route>
          <Route path="error404" element={<Error404 />} /> {/* Ruta de error 404 */}
          <Route path="error500" element={<Error500 />} /> {/* Ruta de error 404 */}
          <Route path="login" element={<Login />} /> {/* Ruta de error 404 */}
          <Route path="register" element={<RegisterPage />} /> {/* Ruta de error 404 */}
          <Route path="tyc" element={<TermsAndConditions />} /> {/* Ruta de error 404 */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;