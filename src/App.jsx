import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products.jsx";
import AdminAgregarProducto from "./pages/AdminAgregarProducto.jsx";
import AdminBorrarProducto from "./pages/AdminBorrarProducto";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/CheckOut.jsx";
import SobreMi from './pages/SobreMi.jsx';
import Contacto from './pages/Contacto';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Products />} />
        <Route path="/sobremi" element={<SobreMi />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/agregar"
          element={
            <PrivateRoute>
              <AdminAgregarProducto />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/borrar"
          element={
            <PrivateRoute>
              <AdminBorrarProducto />
            </PrivateRoute>
          }
        />
      </Routes>

      
      <Footer />
    </Router>
  );
}

export default App;
