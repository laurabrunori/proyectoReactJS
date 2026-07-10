import { useState, useEffect } from 'react';
import TarjetaProducto from './TarjetaProducto';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/productos.json')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="text-center">Cargando productos...</p>;
  
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="row">
      {productos.map(producto => (
        <TarjetaProducto key={producto.id} {...producto} />
      ))}
    </div>
  );
}

export default ListaProductos;
