import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { registrar } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      await registrar(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("No fue posible crear el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-5" style={{ maxWidth: "450px" }}>

        <h2 className="mb-3 text-center">
          Crear cuenta
        </h2>

        <p className="text-center text-muted mb-4">
          Registrate para comenzar a comprar.
        </p>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              className="form-control"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Contraseña
            </label>

            <input
              className="form-control"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <small className="text-muted">
              Debe contener al menos 6 caracteres.
            </small>

          </div>

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Registrarse"}
          </button>

        </form>

      </div>
    </Layout>
  );
}