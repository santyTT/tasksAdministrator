import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../styles/stylesLogin.css";
import { Home } from "lucide-react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor complete todos los campos.");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      onLogin({ email, role: "admin" });
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        onLogin({ email, role: "user" });
      } else {
        setError("Credenciales incorrectas.");
        return;
      }
    }

    setError("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>
          Inicia Sesión <Home size={18} />
        </h2>
        <div className="inputs-login">
          <input
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit">Entrar</button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
