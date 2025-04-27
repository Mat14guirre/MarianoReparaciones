import { useState } from "react";
import useProductos from "../hooks/useProducts.js";
import { useCart } from "../hooks/useCart.js";
import "../App.css"; // Importamos los estilos
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();  // Mover useNavigate dentro del componente Products

  const { productos, cargando } = useProductos();
  const { addToCart } = useCart();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");

  const categorias = ["Todos", ...new Set(productos.map((p) => p.categoria))];

  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaSeleccionada);

  if (cargando)
    return <p className="productos-cargando">Cargando productos...</p>;

  return (
    <>
      <div className="hero-carousel">
        <div className="carousel-images">
          <img src="/carrusel1.webp" alt="" />
          <img src="/carrusel2.jpg" alt="" />
          <img src="/carrusel3.jpg" alt="" />
          <img src="/carrusel4.webp" alt="" />
          <img src="/carrusel5.jpg" alt="" />
        </div>
        <div className="pagina-inicio">
          <h1>Mariano Reparaciones</h1>
          <p>
            Tu lugar de confianza para reparar celulares y conseguir los mejores
            accesorios.
          </p>
        </div>
      </div>

      <div className="productos-container">
        {/* Categorías en formato desplegable para móviles y tablets */}
        <div className="categorias-container">
          <select
            className="categorias-select"
            value={categoriaSeleccionada}
            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Categorías como botones para dispositivos más grandes */}
          <div className="categorias-boton-container">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`categoria-boton ${
                  categoriaSeleccionada === cat ? "activa" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="producto-img"
              />
              <h2 className="producto-nombre">{producto.nombre}</h2>
              <p className="producto-categoria">{producto.categoria}</p>
              <p className="producto-precio">${producto.precio}</p>
              <button
                onClick={() => addToCart(producto)}
                className="producto-btn"
              >
                Agregar al carrito
              </button>
              <button
                onClick={() => navigate(`/producto/${producto.id}`)}
                className="producto-btn ver-detalle-btn"
              >
                Ver detalle
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;