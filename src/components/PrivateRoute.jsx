import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ADMIN_EMAILS } from "../config/adminEmails";

const PrivateRoute = ({ children }) => {
  const { usuario } = useContext(AuthContext);
  console.log("Entrando en PrivateRoute");
  console.log("Usuario:", usuario?.email);
  console.log("ADMIN_EMAILS:", ADMIN_EMAILS);
  console.log("Usuario:", usuario?.email);
  console.log("¿Está permitido?", ADMIN_EMAILS.includes(usuario?.email));

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (!ADMIN_EMAILS.includes(usuario.email)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;