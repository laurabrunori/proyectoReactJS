import { useEffect, useState } from "react";

export default function ProductoForm({ onGuardar, productoEditar }) {
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    imagen: "",
    stock: "",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoEditar) {
      setProducto(productoEditar);
    } else {
      setProducto({
        nombre: "",
        precio: "",
        imagen: "",
        stock: "",
      });
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!producto.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (Number(producto.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0";
    }

    if (Number(producto.stock) < 0) {
      nuevosErrores.stock = "El stock no puede ser negativo";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    onGuardar({
      ...producto,
      precio: Number(producto.precio),
      stock: Number(producto.stock),
    });

    setProducto({
      nombre: "",
      precio: "",
      imagen: "",
      stock: "",
    });

    setErrores({});
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mb-4">

      <h4>
        {productoEditar ? "Editar producto" : "Nuevo producto"}
      </h4>

      <input
        className="form-control mb-2"
        placeholder="Nombre"
        name="nombre"
        value={producto.nombre}
        onChange={handleChange}
      />

      {errores.nombre && (
        <small className="text-danger">{errores.nombre}</small>
      )}

      <input
        className="form-control mb-2"
        placeholder="Precio"
        name="precio"
        type="number"
        value={producto.precio}
        onChange={handleChange}
      />

      {errores.precio && (
        <small className="text-danger">{errores.precio}</small>
      )}

      <input
        className="form-control mb-2"
        placeholder="URL de la imagen"
        name="imagen"
        value={producto.imagen}
        onChange={handleChange}
      />

      <input
        className="form-control mb-3"
        placeholder="Stock"
        name="stock"
        type="number"
        value={producto.stock}
        onChange={handleChange}
      />

      <button className="btn btn-success">
        {productoEditar ? "Actualizar producto" : "Guardar producto"}
      </button>

    </form>
  );
}