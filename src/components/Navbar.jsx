import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut, auth } from "../services/firebase";
import CartIcon from "./CartIcon";
import "../App.css";

const Navbar = () => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const handleSecretClick = (e) => {
    e.preventDefault();
    setClicks((prev) => prev + 1);
  };

  useEffect(() => {
    if (clicks >= 5) {
      navigate("/login");
      setClicks(0);
    }

    const timeout = setTimeout(() => setClicks(0), 1500);
    return () => clearTimeout(timeout);
  }, [clicks, navigate]);

  // Manejo de apertura y cierre del menú hamburguesa
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" onClick={handleSecretClick} className="navbar-title">
          <img
            src="/mariano-log.jpg" 
            alt="Mariano Reparaciones"
            className="navbar-logo"
          />
        </Link>
        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/sobremi">Sobre nosotros</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <CartIcon />

        <div className="navbar-actions">
          {usuario && (
            <>
              <Link to="/admin" className="navbar-link">
                Panel
              </Link>
              <span className="navbar-user">{usuario.displayName}</span>
              <button onClick={handleLogout} className="navbar-button">
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
