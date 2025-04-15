import { useCart } from "../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Carrito = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Tu carrito está vacío 🛒</h2>
        <Link to="/" className="carrito-link">Ir a productos</Link>
      </div>
    );
  }

  return (
    <div className="carrito-container">
      <h2 className="carrito-titulo">Tu carrito 🛒</h2>

      {cart.map((item) => (
        <div key={item.id} className="carrito-item">
          <div>
            <p className="carrito-nombre">{item.nombre}</p>
            <p className="carrito-precio">${item.precio} x {item.quantity}</p>
          </div>

          <div className="carrito-controles">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="btn-cantidad"
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="btn-cantidad"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item.id)}
              className="btn-eliminar"
            >
              🗑️
            </button>
          </div>
        </div>
      ))}

      <h2 className="carrito-total">Total: ${total.toFixed(2)}</h2>

      <div className="carrito-botones">
        <button onClick={clearCart} className="btn-vaciar">
          Vaciar carrito
        </button>
        <button onClick={() => navigate("/checkout")} className="btn-finalizar">
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default Carrito;