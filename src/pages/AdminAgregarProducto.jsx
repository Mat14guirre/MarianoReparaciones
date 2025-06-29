import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const AdminAgregarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagen: "",
    descripcion: "", // Nuevo campo para la descripción
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "productos"), {
        ...producto,
        precio: Number(producto.precio), // Aseguramos que el precio sea un número
      });
      setMensaje("✅ Producto agregado correctamente");
      setProducto({ nombre: "", precio: "", categoria: "", imagen: "", descripcion: "" }); // Limpiar el formulario
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setMensaje("❌ Error al agregar producto");
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
          className="admin-input"
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={producto.precio}
          onChange={handleChange}
          required
          className="admin-input"
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría (ej: accesorios, reparación)"
          value={producto.categoria}
          onChange={handleChange}
          required
          className="admin-input"
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
          className="admin-input"
        />
        <textarea
          name="descripcion"
          placeholder="Descripción del producto"
          value={producto.descripcion}
          onChange={handleChange}
          required
          className="admin-input"
        ></textarea>
        <button type="submit" className="admin-btn">
          Agregar
        </button>
      </form>
      {mensaje && <p className="admin-msg">{mensaje}</p>}
    </div>
  );
};

export default AdminAgregarProducto;