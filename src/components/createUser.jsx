import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./createUser.css";

const CreateUser = ({ onUserCreated, close }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formRef = useRef(null);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        if (!value.trim()) {
          error = "El nombre de usuario es obligatorio.";
        } else if (value.length < 3) {
          error = "El nombre debe tener al menos 3 caracteres.";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "El correo no es válido.";
        }
        break;
      case "password":
        if (value.length < 6) {
          error = "La contraseña debe tener al menos 6 caracteres.";
        }
        break;
      case "confirmPassword":
        if (value !== userData.password) {
          error = "Las contraseñas no coinciden.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const error = validateField(name, value);

    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = Object.keys(userData).reduce((acc, field) => {
      acc[field] = validateField(field, userData[field]);
      return acc;
    }, {});

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);
    if (hasErrors) {
      alert("Corrige los errores antes de continuar.");
      return;
    }

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

    alert("Usuario registrado exitosamente!");

    setUserData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});

    if (onUserCreated) {
      onUserCreated(newUser);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <div>
      <div className="backdrop"></div>
      <form onSubmit={handleSubmit} className="formCreateUser" ref={formRef}>
        <div className="formField">
          <input
            type="text"
            name="username"
            placeholder="Nombre de usuario"
            value={userData.username}
            onChange={handleChange}
            className={errors.username ? "errorInput" : ""}
          />
          {errors.username && <span className="errorText">{errors.username}</span>}
        </div>
        <div className="formField">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
            className={errors.email ? "errorInput" : ""}
          />
          {errors.email && <span className="errorText">{errors.email}</span>}
        </div>
        <div className="formField">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={userData.password}
            onChange={handleChange}
            className={errors.password ? "errorInput" : ""}
          />
          {errors.password && <span className="errorText">{errors.password}</span>}
        </div>
        <div className="formField">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            value={userData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "errorInput" : ""}
          />
          {errors.confirmPassword && (
            <span className="errorText">{errors.confirmPassword}</span>
          )}
        </div>
        <button type="submit">Registrar Usuario</button>
        <button type="button" onClick={close}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

CreateUser.propTypes = {
  onUserCreated: PropTypes.func,
  close: PropTypes.func.isRequired,
};

export default CreateUser;
