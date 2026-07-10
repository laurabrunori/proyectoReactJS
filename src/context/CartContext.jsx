import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);

      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const aumentarCantidad = (id) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito((prev) =>
      prev
        .map((p) =>
          p.id === id
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter((p) => p.cantidad > 0)
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadTotal = () =>
    carrito.reduce((acc, p) => acc + p.cantidad, 0);

  const precioTotal = () =>
    carrito.reduce(
      (acc, p) => acc + Number(p.precio) * p.cantidad,
      0
    );

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarProducto,
        aumentarCantidad,
        disminuirCantidad,
        eliminarProducto,
        vaciarCarrito,
        cantidadTotal,
        precioTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}