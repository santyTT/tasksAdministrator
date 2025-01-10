import PropTypes from 'prop-types';
import "../styles/userAside.css"

const UserDashboard = ({ onLogout }) => {
  return (
    <div>
         <aside className="asideNv">
        <div className="topItems2">
        <div className="itemBar0">
        <h5>
        <i className="fa-solid fa-user"></i>User.Task
        </h5>
        </div>
       <div className="itemBar1"> </div>
       <div className="searchAlignIcon">
       <i className="fa-solid fa-magnifying-glass"></i>
        <input type="search" name="" id="" placeholder="Busca" />
       </div>
       <div className="itemsMedie">
        <div><i className="fa-solid fa-table-columns"></i>
           <a href="#">Tareas</a>
        </div>
        <div><i className="fa-solid fa-bell"></i>
            <a href="#">Notificaciones</a>
        </div>
       </div>
       </div>
       <div className="bottomItems">
        <button><i className="fa-solid fa-gear"></i> Configuracion</button>
        <button onClick={onLogout}><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión</button>
        </div>
      </aside>
    </div>
  );
};

UserDashboard.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default UserDashboard;
