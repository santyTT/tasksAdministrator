import PropTypes from "prop-types";
import "../styles/adminAside.css";
import { useState } from "react";
import CreateUser from "./createUser";
import UserList from "./userList";
import DashboardAdmin from "./DashboardAdmin";

const AdminDashboard = ({ onLogout }) => {
  // Corrige el nombre de setActiveComponet a setActiveComponent
  const [activeComponent, setActiveComponent] = useState('createUser');
  const [users, setUsers] = useState([]);

  const handleChangeComponent = (Component) => {
    setActiveComponent(Component);
  }
  const handleUserCreated = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); // Agregar el nuevo usuario a la lista
  };
  return (
    <div className="bigC">
      <aside className="asideNv">
        <div className="topItems">
          <div className="itemBar0">
            <h5>
              <i className="fa-solid fa-user-tie"></i>Admin.Task
            </h5>
          </div>
          <div className="itemBar1"> </div>
          <div className="searchAlignIcon">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" name="" id="" placeholder="Busca" />
          </div>
          <div className="itemsMedie">
            <div><i className="fa-solid fa-table-columns"></i>
              <button onClick={() => handleChangeComponent('dashboard')}>Dashboard</button>
            </div>
            <div><i className="fa-solid fa-bell"></i>
              <button onClick={() => handleChangeComponent('createUser')}>Notificaciones</button>
            </div>
            <div><i className="fa-solid fa-user-group"></i>
              <button onClick={() => handleChangeComponent('members')}>Miembros</button>
            </div>
          </div>
        </div>
        <div className="bottomItems">
          <button><i className="fa-solid fa-gear"></i> Configuracion</button>
          <button onClick={onLogout}><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión</button>
        </div>
      </aside>
      <main style={{overflowY: "scroll", height: "100vh", position: "relative", left: "3%"}} className="overScroll">
        {/* Cambiar el renderizado según el estado */}
        {activeComponent === 'createUser' && <CreateUser onUserCreated={handleUserCreated}  />}
        {activeComponent === 'dashboard' && <DashboardAdmin />} {/* Renderiza un dashboard placeholder */}
        {activeComponent === 'members' && <UserList users={users} />} {/* Renderiza los miembros */}
      </main>
    </div>
  );
};

AdminDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default AdminDashboard;
