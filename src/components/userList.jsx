import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = searchQuery.toLowerCase();
    return (
      (user.username && user.username.toLowerCase().includes(searchText)) ||
      (user.email && user.email.toLowerCase().includes(searchText)) ||
      (user.id && String(user.id).toLowerCase().includes(searchText))
    );
  });

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      <input
        type="text"
        placeholder="Buscar por ID, correo o nombre"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id}>
              {user.username} - {user.email}
              <button onClick={() => handleDeleteUser(user.id)}>
                Eliminar
              </button>
            </li>
          ))
        ) : (
          <p>No se encontraron usuarios</p>
        )}
      </ul>
    </div>
  );
};

export default UserList;
