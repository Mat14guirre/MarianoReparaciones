import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const CartIcon = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link to="/carrito" className="cart-icon">
      🛒
      {totalItems > 0 && (
        <span className="cart-badge">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;