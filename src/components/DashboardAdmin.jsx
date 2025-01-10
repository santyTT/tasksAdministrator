import { useState, useEffect } from "react";
import "./AdminDashboard.css";
import CreateUser from "./createUser";
import "./ModalAddTask.css";
import PanelControlTask from "./PanelControlTask";

const DashboardAdmin = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [CreateUserM, setCreateUserM] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    observation: "",
    user: "",
    time: "",
    company: "",
    projects: "",
    status: "no iniciada",
  });
  const [users, setUsers] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const hours = currentTime.getHours();
  const isNight = hours >= 19 || hours < 6;
  const icon = isNight ? "🌙" : "☀️";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dayOfWeek = daysOfWeek[currentTime.getDay()];
  const dayOfMonth = currentTime.getDate();
  const month = months[currentTime.getMonth()];
  const year = currentTime.getFullYear();

  const companies = ["Company A", "Company B", "Company C"];
  const projects = ["Proyec 1", "Proyec 2", "Proyec 3"];

  const toggleModalAdd = () => {
    setModalOpen(!isModalOpen);
  };
  const toggleModalAddUser = () => {
    setCreateUserM(!CreateUserM);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const createdDate = new Date().toISOString().split("T")[0];
    const newTask = { id: Date.now(), ...formData, createdDate };
    setTasks([...tasks, newTask]);
    setFormData({
      title: "",
      observation: "",
      user: "",
      time: "",
      company: "",
      status: "no iniciada",
    });
    setModalOpen(false);
  };

  return (
    <div className="content-G">
      <div className="top-accions">
        <div>
          <span>!HOLA ADMIN! {icon}</span>
          <span>
            Hoy es {dayOfWeek}, {dayOfMonth} {month} {year}
          </span>
        </div>
        <span style={{ position: "relative", right: "7%" }}>
          {currentTime.toLocaleTimeString()}
        </span>
        <div className="lateral-accions-top">
          <button onClick={toggleModalAddUser}>
            <i className="fa-solid fa-user-plus"></i>
          </button>
          {!CreateUserM && <CreateUser />}
        </div>
      </div>

      {isModalOpen && (
        <>
          <div className="backdrop" onClick={toggleModalAdd}></div>
          <div>
            <form
              onSubmit={handleTaskSubmit}
              className={`modal ${isModalOpen ? "slide-in" : ""}`}
            >
              <label className="input1">
                <input
                  type="text"
                  name="title"
                  placeholder="Nombre De La Tarea"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <div className="alignInputs">
                <label>
                  Encargado:
                  <select
                    name="user"
                    value={formData.user}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    {users.map((user) => (
                      <option key={user.id} value={user.email}>
                        {user.username || user.email}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Area:
                  <select
                    name="projects"
                    value={formData.projects}
                    onChange={handleChange}
                    required
                  >
                    <option value="proyects"></option>
                    {projects.map((project, index) => (
                      <option key={index} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Empresa:
                  <select
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    {companies.map((company, index) => (
                      <option key={index} value={company}>
                        {company}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Fecha límite:
                  <input
                    type="date"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </label>
                <label className="descripcion-areaTxt">
                  <textarea
                    placeholder="Descripcion"
                    name="observation"
                    value={formData.observation}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <button type="submit" className="button-addTaks">
                Agregar Tarea
              </button>
              <button onClick={toggleModalAdd} className="quitM">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </form>
          </div>
        </>
      )}

      <section>
        <PanelControlTask tasks={tasks} panel={toggleModalAdd} />
      </section>
    </div>
  );
};

export default DashboardAdmin;
