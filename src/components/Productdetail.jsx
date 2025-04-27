import { useParams, useNavigate } from "react-router-dom";  // Importamos useNavigate
import useProductos from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";  // Importamos el hook useCart

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();  // Definimos useNavigate dentro del componente
  const { productos, cargando } = useProductos();
  const { addToCart } = useCart();  // Obtenemos la función para agregar al carrito

  if (cargando) return <p>Cargando producto...</p>;

  const producto = productos.find((p) => p.id === id);

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div className="producto-detalle">
      <img src={producto.imagen} alt={producto.nombre} className="producto-img-detalle" />
      <h1>{producto.nombre}</h1>
      <p>Categoría: {producto.categoria}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Descripción: {producto.descripcion}</p> {/* Agregás campo descripción en la DB */}
      
      {/* Botón de "Agregar al carrito" */}
      <button onClick={() => addToCart(producto)} className="producto-btn">
        Agregar al carrito
      </button>

      {/* Botón de "Volver a productos" */}
      <button onClick={() => navigate("/")} className="volver-btn">
        Volver a productos
      </button>
    </div>
  );
};

export default ProductDetail;