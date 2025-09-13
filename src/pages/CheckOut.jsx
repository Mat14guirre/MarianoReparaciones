import { useContext, useState } from "react";
import { CartContext } from "../context/CartProvider";
import { collection, addDoc, getFirestore, Timestamp } from "firebase/firestore";
import "../App.css";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });
  const [pedidoId, setPedidoId] = useState(null);

  const total = cart.reduce(
    (acc, item) => acc + Number(item.precio) * Number(item.quantity),
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const itemsValidos = cart.map((item) => ({
      ...item,
      precio: Number(item.precio),
      quantity: Number(item.quantity),
    }));

    const pedido = {
      comprador: formData,
      items: itemsValidos,
      total,
      fecha: Timestamp.now(),
    };

    const db = getFirestore();
    const pedidosRef = collection(db, "pedidos");

    try {
      const docRef = await addDoc(pedidosRef, pedido);
      setPedidoId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al guardar pedido:", error.message, error);
    }
  };

  if (pedidoId) {
    return (
      <div className="checkout-gracias">
        <h2 className="checkout-exito">¡Gracias por tu compra!</h2>
        <p>
          Tu número de pedido es: <strong>{pedidoId}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-titulo">Finalizar compra</h2>

      {cart.length === 0 ? (
        <p className="checkout-vacio">No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="checkout-lista">
            {cart.map((item) => (
              <li key={item.id} className="checkout-item">
                {item.nombre} x{item.quantity} - ${item.precio * item.quantity}
              </li>
            ))}
          </ul>

          <p className="checkout-total">Total: ${total.toFixed(2)}</p>

          <form onSubmit={handleSubmit} className="checkout-form">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="checkout-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="checkout-input"
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="checkout-input"
            />
            <button type="submit" className="checkout-btn">
              Confirmar pedido
            </button>
            <p>NO PAGUES ANTES! AL CONFIRMAR EL VENDEDOR SE PONDRÁ EN CONTACTO CONTIGO PARA REALIZAR EL PAGO Y COORDINAR EL ENVÍO</p>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;