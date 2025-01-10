import "./panelControlTask.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";


const formatDate = (dateString) => {
  if (!dateString) return "Sin fecha";
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};


const PanelControlTask = ({ tasks, panel }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  return (
    <div>
      <main>
        <div className="boxTask1">
          <div className="topBox">
            <div className="alignItemsL">
              <h4>Tareas en acción</h4>
              <div className="activity">
                <span>
                  <i className="fa-solid fa-users-line"></i> Equipo
                </span>
                <span>
                  <i className="fa-solid fa-boxes-stacked"></i> {tasks.length}{" "}
                  tareas
                </span>
              </div>
            </div>
            <div>
              <button style={{marginRight: "10px"}} onClick={panel}>
                <i className="fa-solid fa-plus"></i> 
              </button>
              <button>
                <i className="fa-solid fa-filter"></i> Filtrar
              </button>
            </div>
          </div>
          <div className="MediunBox">
            <span>
              <i className="fa-solid fa-spinner"></i> No iniciadas
            </span>
            <span>
              {tasks.filter((task) => task.status === "no iniciada").length}
            </span>
          </div>
          <div className="table">
            <table className="task-table">
              <thead>
                <tr>
                  <th>
                    <i className="fa-solid fa-file-signature"></i> Tarea
                  </th>
                  <th>
                    <i className="fa-solid fa-message"></i> Descripción
                  </th>
                  <th>
                    <i className="fa-solid fa-users"></i> Persona
                  </th>
                  <th>
                    <i className="fa-solid fa-hourglass-half"></i> Tiempo
                  </th>
                  <th>
                    <i className="fa-solid fa-pen-to-square"></i> Area</th>
                  <th>
                    <i className="fa-solid fa-building"></i> Empresa
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.title}</td>
                    <td>{task.observation}</td>
                    <td>
                      {users.find((user) => user.email === task.user)
                        ?.username || "Usuario desconocido"}
                    </td>

                    <td>
                      {formatDate(task.createdDate)}/
                      {task.time ? formatDate(task.time) : "Sin límite"}
                    </td>
                    <td>{task.projects}</td>
                    <td>{task.company || "No asignada"}</td>
                    <td className="edit-fill">
                      <div className="task-actions">
                        <div className="dropdown">
                          <button className="dropbtn">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

PanelControlTask.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      observation: PropTypes.string,
      user: PropTypes.string.isRequired, 
      createdDate: PropTypes.string, 
      time: PropTypes.string, 
      company: PropTypes.string,
      status: PropTypes.string,
          panel: PropTypes.func.isRequired,
        })
      ).isRequired,
      onEditTask: PropTypes.func.isRequired,
      onDeleteTask: PropTypes.func.isRequired,
      panel: PropTypes.func.isRequired,
    };
export default PanelControlTask;
