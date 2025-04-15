import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

const AdminBorrarProducto = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const obtenerProductos = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const docs = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProductos(docs);
  };

  const borrarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setMensaje("✅ Producto eliminado");
      obtenerProductos();
    } catch (error) {
      console.error("Error al borrar producto:", error);
      setMensaje("❌ No se pudo borrar el producto");
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div className="admin-delete-container">
      <h2 className="admin-title">Eliminar Productos</h2>
      {mensaje && <p className="admin-msg">{mensaje}</p>}
      <div className="admin-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="admin-card">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="admin-card-img"
            />
            <h3 className="admin-card-title">{producto.nombre}</h3>
            <p className="admin-card-cat">{producto.categoria}</p>
            <p className="admin-card-price">${producto.precio}</p>
            <button
              onClick={() => borrarProducto(producto.id)}
              className="admin-delete-btn"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBorrarProducto;