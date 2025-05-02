import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Información del local */}
        <div className="footer-info">
          <h3>Mariano Reparaciones</h3>
          <p>Reparación de celulares y venta de accesorios.</p>
          <p>Dirección: Ayacucho 6086, Rosario, Argentina</p>
          <p>Teléfono: 3413651212</p>
          <p>Email: mariano.lopez.nicolas@gmail.com</p>
        </div>

        {/* Enlaces de navegación */}
        <div className="footer-links">
          <h3>Navegar</h3>
          <ul>
            <li>
              <a href="/productos">Productos</a>
            </li>
            <li>
              <a href="/carrito">Carrito</a>
            </li>
            <li>
              <a href="/contacto">Contacto</a>
            </li>
            <li>
              <a href="/sobremi">Sobre mi</a>
            </li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            &copy; 2025 Mariano Reparaciones. Todos los derechos reservados.
          </p>
        </div>

        <div className="footer-social">
          <a
            href="https://wa.me/3413651212"
            target="_blank"
            className="social-icon"
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
          <a
            href="https://www.instagram.com/marianoreparaciones.mrll?igsh=MXJxeWlmZGNkZnJpMw=="
            target="_blank"
            className="social-icon"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="mailto:mariano.lopez.nicolas@gmail.com"
            className="social-icon"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
