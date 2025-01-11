import PropTypes from "prop-types";
import "../styles/adminAside.css";
import { useState } from "react";
import UserList from "./userList";
import DashboardAdmin from "./DashboardAdmin";

const AdminDashboard = ({ onLogout }) => {
  const users = []; // Define the users array or fetch it from an API
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleChangeComponent = (Component) => {
    setActiveComponent(Component);
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
            <div>
              <i className="fa-solid fa-table-columns"></i>
              <button onClick={() => handleChangeComponent("dashboard")}>
                Dashboard
              </button>
            </div>
            <div>
              <i className="fa-solid fa-bell"></i>
              <button onClick={() => handleChangeComponent("")}>
                Notificaciones
              </button>
            </div>
            <div>
              <i className="fa-solid fa-user-group"></i>
              <button onClick={() => handleChangeComponent("members")}>
                Miembros
              </button>
            </div>
          </div>
        </div>
        <div className="bottomItems">
          <button>
            <i className="fa-solid fa-gear"></i> Configuracion
          </button>
          <button onClick={onLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
          </button>
        </div>
      </aside>
      <main
        style={{
          overflowY: "scroll",
          height: "100vh",
          position: "relative",
          left: "3%",
        }}
        className="overScroll"
      >
        {activeComponent === "dashboard" && <DashboardAdmin />}
        {activeComponent === "members" && <UserList users={users} />}
      </main>
    </div>
  );
};

AdminDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default AdminDashboard;
