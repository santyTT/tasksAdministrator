import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateUser = ({ onUserCreated }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Manejo del cambio de datos en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Manejo del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los usuarios existentes
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el email ya existe
    const userExists = users.find(u => u.email === userData.email);

    if (userExists) {
      alert("El usuario ya está registrado.");
      return;
    }

    // Crear nuevo usuario con rol 'user'
    const newUser = {
        id: Date.now(), // Usamos el timestamp como ID único
        email: userData.email,
        username: userData.username, // Asegúrate de que este campo se guarda
        password: userData.password,
        role: 'user', // Rol fijo 'user' para todos los usuariosRol fijo 'user' para todos los usuarios
    };

    // Agregar el nuevo usuario a la lista y actualizar localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Reseteamos el formulario
    setUserData({
      email: "",
      password: "",
    });

    alert("Usuario registrado exitosamente!");

    if (onUserCreated) {
      onUserCreated(newUser);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={userData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar Usuario</button>

    </form>
  );
};
CreateUser.propTypes = {
  onUserCreated: PropTypes.func,
};

export default CreateUser;
