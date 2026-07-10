import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Email o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-5" style={{ maxWidth: "450px" }}>

        <h2 className="mb-3 text-center">
          Iniciar sesión
        </h2>

        <p className="text-center text-muted mb-4">
          Accedé a tu cuenta para continuar.
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

      </div>
    </Layout>
  );
}