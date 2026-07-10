import { useState } from "react";
import styles from "./TarjetaProducto.module.css";
import { useCart } from "../context/CartContext";

function TarjetaProducto({ id, nombre, precio, imagen, stock }) {
  const [favorito, setFavorito] = useState(false);

  const { agregarProducto } = useCart();

  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  const agregar = () => {
    agregarProducto({
      id,
      nombre,
      precio,
      imagen,
      stock,
    });

    alert("Producto agregado al carrito");
  };

  return (
    <div className="col-md-4 mb-4">
      <div className={`card ${styles.card}`}>
        <img
          src={imagen}
          className={`card-img-top ${styles.cardImg}`}
          alt={nombre}
        />

        <div className="card-body">
          <h5>{nombre}</h5>

          <p className="fw-bold text-success">
            ${precio}
          </p>

          <div className="d-flex justify-content-between align-items-center">

            <button
              className="btn btn-primary"
              onClick={agregar}
            >
              Agregar al carrito
            </button>

            <span
              className={styles.estrella}
              onClick={toggleFavorito}
            >
              {favorito ? "⭐" : "☆"}
            </span>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;