import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "../styles/stylesLogin.css";
import { Home } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mostrar errores

  // Aseguramos que los usuarios están en localStorage
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([])); // Inicia con un array vacío si no hay usuarios
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Por favor complete todos los campos.');
      return;
    }

    // Verificar si es el admin principal
    if (email === 'admin@gmail.com' && password === 'admin123') {
      onLogin({ email, role: 'admin' }); // Si es el admin, logueamos como admin
    } else {
      // Si no es el admin, buscar en los usuarios creados
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Si es un usuario registrado
        onLogin({ email, role: 'user' }); // El rol de todos los usuarios es 'user'
      } else {
        setError('Credenciales incorrectas.');
        return;
      }
    }

    setError(''); // Limpiar errores si la validación es exitosa
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Inicia Sesión <Home size={18} /></h2>
        <div className="inputs-login">
          <input
            type="email"
            autoComplete='off'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit">Entrar</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
