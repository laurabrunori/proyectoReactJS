import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductoForm from "../components/ProductoForm";

import {
  obtenerProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from "../services/productos";

export default function Admin() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function cargarProductos() {
    setLoading(true);
    setError("");

    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (error) {
      console.error("Error al cargar productos:", error);
      setError("No fue posible cargar los productos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  async function guardar(producto) {
    try {
      if (productoEditar) {
        await editarProducto(productoEditar.id, producto);
        setProductoEditar(null);
      } else {
        await agregarProducto(producto);
      }

      await cargarProductos();

    } catch (error) {
      console.error("Error al guardar producto:", error);
      setError("No fue posible guardar el producto.");
    }
  }

  async function confirmarEliminar(producto) {
    const confirmar = window.confirm(
      `¿Desea eliminar "${producto.nombre}"?`
    );

    if (!confirmar) return;

    try {
      await eliminarProducto(producto.id);
      cargarProductos();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Cargando productos...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mt-4">

        <h2 className="mb-4">
          Panel de Administración
        </h2>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <ProductoForm
          onGuardar={guardar}
          productoEditar={productoEditar}
        />

        <hr />

        <h3 className="mb-3">
          Productos cargados
        </h3>

        {productos.length === 0 ? (
          <div className="alert alert-warning">
            No hay productos cargados.
          </div>
        ) : (
          <table className="table table-striped table-hover">

            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>

              {productos.map((producto) => (

                <tr key={producto.id}>

                  <td>{producto.nombre}</td>

                  <td>${producto.precio}</td>

                  <td>{producto.stock}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setProductoEditar(producto)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => confirmarEliminar(producto)}
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}


      </div>
    </Layout>
  );
}