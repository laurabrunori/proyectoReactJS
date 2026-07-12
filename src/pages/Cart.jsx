import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/CartContext";
import { buscarCupon } from "../services/cupones";

export default function Cart() {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
    precioTotal,
  } = useCart();

  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);

  const aplicarCupon = async () => {
    if (!cupon.trim()) {
      alert("Ingrese un código de cupón.");
      return;
    }

    try {
      const cuponEncontrado = await buscarCupon(cupon);

      if (!cuponEncontrado) {
        setDescuento(0);
        alert("El cupón no existe.");
        return;
      }

      if (!cuponEncontrado.activo) {
        setDescuento(0);
        alert("Este cupón se encuentra inactivo.");
        return;
      }

      setDescuento(cuponEncontrado.descuento);

      alert(
        `Cupón aplicado. Descuento: ${cuponEncontrado.descuento}%`
      );
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al validar el cupón.");
    }
  };

  const total = precioTotal();
  const totalFinal = total - total * (descuento / 100);

  return (
    <Layout>

      <h2 className="mb-4">Mi carrito</h2>

      {carrito.length === 0 ? (
        <div className="alert alert-info">
          El carrito está vacío.
        </div>
      ) : (
        <>
          <table className="table align-middle">

            <thead>

              <tr>

                <th>Producto</th>

                <th>Cantidad</th>

                <th>Precio</th>

                <th>Subtotal</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {carrito.map((producto) => (

                <tr key={producto.id}>

                  <td>{producto.nombre}</td>

                  <td>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => disminuirCantidad(producto.id)}
                    >
                      -
                    </button>

                    <span className="mx-3">
                      {producto.cantidad}
                    </span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => aumentarCantidad(producto.id)}
                    >
                      +
                    </button>

                  </td>

                  <td>${producto.precio}</td>

                  <td>
                    ${producto.precio * producto.cantidad}
                  </td>

                  <td>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        eliminarProducto(producto.id)
                      }
                    >
                      Eliminar
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div className="card p-3 mt-4">

            <h5>Cupón de descuento</h5>

            <div className="d-flex">

              <input
                className="form-control me-2"
                value={cupon}
                onChange={(e) => setCupon(e.target.value)}
                placeholder="Ej: SAFARI10"
              />

              <button
                className="btn btn-primary"
                onClick={aplicarCupon}
              >
                Aplicar
              </button>

            </div>

            <hr />

            <h5>Total: ${total}</h5>

            {descuento > 0 && (
              <>
                <h6>Descuento: {descuento}%</h6>

                <h4 className="text-success">
                  Total final: ${totalFinal}
                </h4>
              </>
            )}

            <button
              className="btn btn-warning mt-3"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </button>

          </div>
        </>
      )}
    </Layout>
  );
}