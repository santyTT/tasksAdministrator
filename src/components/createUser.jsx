import { useState } from "react";
import PropTypes from "prop-types";

const CreateUser = ({ onUserCreated }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.email === userData.email);

    if (userExists) {
      alert("El usuario ya está registrado.");
      return;
    }

    const newUser = {
      id: Date.now(),
      email: userData.email,
      username: userData.username,
      password: userData.password,
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

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
