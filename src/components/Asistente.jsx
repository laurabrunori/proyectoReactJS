function Asistente({ nombre, tarea, emoji }) {
    return (
        <div className="asistente">
            <h3>{nombre}</h3>
            <p>{tarea} {emoji} </p>
        </div>
    );
}

export default Asistente;