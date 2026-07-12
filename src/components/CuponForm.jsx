import { useEffect, useState } from "react";

export default function CuponForm({
  onGuardar,
  cuponEditar,
}) {
  const [cupon, setCupon] = useState({
    codigo: "",
    descuento: "",
    activo: true,
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (cuponEditar) {
      setCupon(cuponEditar);
    }
  }, [cuponEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCupon({
      ...cupon,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!cupon.codigo.trim()) {
      nuevosErrores.codigo = "El código es obligatorio";
    }

    if (
      Number(cupon.descuento) <= 0 ||
      Number(cupon.descuento) > 100
    ) {
      nuevosErrores.descuento =
        "Debe ser un valor entre 1 y 100";
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validar()) return;

    onGuardar({
      ...cupon,
      codigo: cupon.codigo.toUpperCase(),
      descuento: Number(cupon.descuento),
    });

    setCupon({
      codigo: "",
      descuento: "",
      activo: true,
    });

    setErrores({});
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 mb-4">

      <h4>Nuevo Cupón</h4>

      <input
        className="form-control mb-2"
        placeholder="Código"
        name="codigo"
        value={cupon.codigo}
        onChange={handleChange}
      />

      {errores.codigo && (
        <small className="text-danger">
          {errores.codigo}
        </small>
      )}

      <input
        className="form-control mb-2"
        type="number"
        placeholder="Descuento (%)"
        name="descuento"
        value={cupon.descuento}
        onChange={handleChange}
      />

      {errores.descuento && (
        <small className="text-danger">
          {errores.descuento}
        </small>
      )}

      <div className="form-check mb-3">

        <input
          className="form-check-input"
          type="checkbox"
          name="activo"
          checked={cupon.activo}
          onChange={handleChange}
        />

        <label className="form-check-label">
          Cupón activo
        </label>

      </div>

      <button className="btn btn-success">

        {cuponEditar
          ? "Actualizar cupón"
          : "Guardar cupón"}

      </button>

    </form>
  );
}