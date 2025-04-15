import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import "../App.css";

const AdminPanel = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const obtenerPedidos = async () => {
      try {
        const pedidosCollection = collection(db, "pedidos");
        const pedidosSnapshot = await getDocs(pedidosCollection);
        const pedidosList = pedidosSnapshot.docs.map((doc) => ({
          id: doc.id, // capturamos el ID del documento
          ...doc.data(),
        }));
        setPedidos(pedidosList);
      } catch (error) {
        console.error("Error al obtener pedidos", error);
      }
    };

    obtenerPedidos();
  }, []);

  const despacharPedido = async (id) => {
    try {
      await deleteDoc(doc(db, "pedidos", id));
      setPedidos((prev) => prev.filter((pedido) => pedido.id !== id));
    } catch (error) {
      console.error("Error al eliminar el pedido", error);
    }
  };

  return (
    <div className="admin-panel">
      <h1 className="admin-titulo">Panel de Administración</h1>
      <div className="admin-botones">
        <Link to="/admin/agregar" className="admin-btn agregar">
          ➕ Agregar Producto
        </Link>
        <Link to="/admin/borrar" className="admin-btn borrar">
          🗑️ Eliminar Producto
        </Link>
        <Link to="/" className="admin-btn volver">
          🏠 Volver a la Tienda
        </Link>
      </div>

      <h2 className="admin-subtitulo">Listado de Pedidos</h2>

      <table className="tabla-pedidos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.comprador?.nombre}</td>
                <td>{pedido.comprador?.email}</td>
                <td>{pedido.comprador?.telefono}</td>
                <td>
                  {pedido.items?.map((item, idx) => (
                    <div key={idx}>
                      <strong>{item.nombre}</strong> - {item.quantity} x ${item.precio}
                    </div>
                  ))}
                </td>
                <td>${pedido.total}</td>
                <td>{new Date(pedido.fecha.seconds * 1000).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => despacharPedido(pedido.id)}
                    className="btn-despachar"
                  >
                    Despachar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay pedidos confirmados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;