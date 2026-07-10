import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { usuario } = useAuth();

  return (
    <Layout>
      <div className="container mt-5" style={{ maxWidth: "600px" }}>

        <div className="card shadow p-4">

          <h2 className="mb-4 text-center">
            Mi Perfil
          </h2>

          <p>
            <strong>Email:</strong>{" "}
            {usuario?.email}
          </p>

          <p>
            <strong>UID:</strong>{" "}
            {usuario?.uid}
          </p>

          <p>
            <strong>Estado:</strong>{" "}
            <span className="badge bg-success">
              Usuario autenticado
            </span>
          </p>

        </div>

      </div>
    </Layout>
  );
}