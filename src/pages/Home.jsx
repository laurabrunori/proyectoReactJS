import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import TarjetaProducto from "../components/TarjetaProducto";
import { obtenerProductos } from "../services/productos";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarProductos() {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    }

    cargarProductos();
  }, []);

  return (
    <Layout>
      <h2 className="mb-2">Productos destacados</h2>

      <p className="text-muted mb-4">
        Descubrí nuestra colección de indumentaria y accesorios de trabajo.
      </p>

      {loading && (
        <div className="text-center my-5">
          <div
            className="spinner-border text-primary"
            role="status"
          />
          <p className="mt-3">
            Cargando productos...
          </p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && productos.length === 0 && (
        <div className="alert alert-warning text-center">
          No hay productos disponibles.
        </div>
      )}

      {!loading && !error && productos.length > 0 && (
        <div className="row">
          {productos.map((producto) => (
            <TarjetaProducto
              key={producto.id}
              {...producto}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}