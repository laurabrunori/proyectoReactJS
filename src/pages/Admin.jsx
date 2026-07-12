import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import ProductoForm from "../components/ProductoForm";
import CuponForm from "../components/CuponForm";

import {
  obtenerProductos,
  agregarProducto,
  editarProducto,
  eliminarProducto,
} from "../services/productos";

import {
  obtenerCupones,
  agregarCupon,
  editarCupon,
  eliminarCupon,
} from "../services/cupones";

export default function Admin() {
  // -----------------------------
  // PRODUCTOS
  // -----------------------------
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);

  // -----------------------------
  // CUPONES
  // -----------------------------
  const [cupones, setCupones] = useState([]);
  const [cuponEditar, setCuponEditar] = useState(null);

  useEffect(() => {
    cargarProductos();
    cargarCupones();
  }, []);

  // ===========================
  // PRODUCTOS
  // ===========================

  async function cargarProductos() {
    try {
      const datos = await obtenerProductos();
      setProductos(datos);
    } catch (error) {
      console.error(error);
    }
  }

  async function guardarProducto(producto) {
    try {
      if (productoEditar) {
        await editarProducto(productoEditar.id, producto);
        setProductoEditar(null);
      } else {
        await agregarProducto(producto);
      }

      cargarProductos();
    } catch (error) {
      console.error(error);
    }
  }

  async function borrarProducto(id) {
    const confirmar = window.confirm(
      "¿Desea eliminar este producto?"
    );

    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch (error) {
      console.error(error);
    }
  }

  // ===========================
  // CUPONES
  // ===========================

  async function cargarCupones() {
    try {
      const datos = await obtenerCupones();
      setCupones(datos);
    } catch (error) {
      console.error(error);
    }
  }

  async function guardarCupon(cupon) {
    try {
      if (cuponEditar) {
        await editarCupon(cuponEditar.id, cupon);
        setCuponEditar(null);
      } else {
        await agregarCupon(cupon);
      }

      cargarCupones();
    } catch (error) {
      console.error(error);
    }
  }

  async function borrarCupon(id) {
    const confirmar = window.confirm(
      "¿Desea eliminar este cupón?"
    );

    if (!confirmar) return;

    try {
      await eliminarCupon(id);
      cargarCupones();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout>
      <div className="container mt-4">

        <h2 className="mb-4">
          Panel de Administración
        </h2>

        {/* ==========================
            PRODUCTOS
        =========================== */}

        <h3>Gestión de Productos</h3>

        <ProductoForm
          onGuardar={guardarProducto}
          productoEditar={productoEditar}
        />

        <table className="table table-striped table-hover mt-4">

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
                    onClick={() =>
                      borrarProducto(producto.id)
                    }
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <hr className="my-5" />

        {/* ==========================
            CUPONES
        =========================== */}

        <h3>Gestión de Cupones</h3>

        <CuponForm
          onGuardar={guardarCupon}
          cuponEditar={cuponEditar}
        />

        <table className="table table-striped table-hover mt-4">

          <thead className="table-dark">

            <tr>
              <th>Código</th>
              <th>Descuento</th>
              <th>Activo</th>
              <th>Acciones</th>
            </tr>

          </thead>

          <tbody>

            {cupones.map((cupon) => (

              <tr key={cupon.id}>

                <td>{cupon.codigo}</td>

                <td>{cupon.descuento}%</td>

                <td>
                  {cupon.activo ? "Sí" : "No"}
                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setCuponEditar(cupon)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      borrarCupon(cupon.id)
                    }
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
    </Layout>
  );
}