import { useState } from 'react';

export function Contador() {

    //const [NombreVariable, NombrefunciónCambiaEstado] = useState(valor Inicial)
    const [contador, setContador] = useState(0);

    

    const incrementar = () => {
        setContador(contador + 1); //¡Usamos la función para actualizar el estado!
    };

    const decrementar = () => {
        setContador(contador - 1);
    };

    return (
        <div>
            <p>Cantidad: {contador}</p>
            <button onClick={incrementar}>Sumar +1</button>
            <button onClick={decrementar}>Restar -1</button>
        </div>
    );

}
