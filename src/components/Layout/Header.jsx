import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Header() {
  const { usuario, logout } = useAuth();
  const { cantidadTotal } = useCart();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          Shop Brunori
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPrincipal"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarPrincipal"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/carrito">
                🛒 Carrito ({cantidadTotal()})
              </Link>
            </li>

            {!usuario ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/registro">
                    Registrarse
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">
                    Hola, {usuario.email.split("@")[0]}
                  </span>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/perfil">
                    Perfil
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Administración
                  </Link>
                </li>

                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <button
                    className="btn btn-outline-light btn-sm"
                    onClick={cerrarSesion}
                  >
                    Salir
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Header;