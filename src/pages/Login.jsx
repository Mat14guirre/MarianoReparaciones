import { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { provider, auth, signOut } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { ADMIN_EMAILS } from "../config/adminEmails";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verificamos que esté autorizado
      if (!ADMIN_EMAILS.includes(user.email)) {
        alert("No tenés permiso para acceder.");
        await signOut(auth);
        return;
      }

      // Acceso permitido
      navigate("/admin");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.code, error.message);
      alert("Hubo un problema al iniciar sesión. Por favor, intentá nuevamente.");
    }
  };

  useEffect(() => {
    document.title = "Admin | Login";
  }, []);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">¡Hola otra vez!</h1>
        <button onClick={handleLogin} className="login-btn">
          Ingresar con Google
        </button>
      </div>
    </div>
  );
};

export default Login;