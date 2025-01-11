import "./panelControlTask.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import TaskTable from "./TaskTable";
import SelectDeleteAreaEmpress from "./selectDeleteAP";
import EditModal from "../modules/editTask";
import TaskToComplete from "./TaskComplete";
import DetailsModal from "./DetailsModal";

const PanelControlTask = () => {
  const [users, setUsers] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
    const storedCompanies = JSON.parse(localStorage.getItem("companies")) || [];
    setCompanies(storedCompanies);
    const storedAreas = JSON.parse(localStorage.getItem("areas")) || [];
    setAreas(storedAreas);
  }, []);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const activeTasks = storedTasks.filter(
      (task) => !task.deleted && task.status !== "terminada"
    );
    const completedTasks = storedTasks.filter(
      (task) => task.status === "terminada"
    );
    setTaskList(activeTasks);
    setCompletedTasks(completedTasks);
  }, []);

  useEffect(() => {
    const allTasks = [...taskList, ...completedTasks];
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    localStorage.setItem("companies", JSON.stringify(companies));
    localStorage.setItem("areas", JSON.stringify(areas));
  }, [taskList, completedTasks, companies, areas]);

  const formatDate = (dateString) => {
    if (!dateString) return "Sin fecha";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleCreateTask = () => {
    const newTask = {
      id: Date.now(),
      title: "Edita titulo",
      observation: "Edita Descripcion",
      user: "",
      createdDate: new Date().toISOString().split("T")[0],
      projects: "",
      company: "",
      status: "no iniciada",
      deleted: false,
    };
    setTaskList((prevTasks) => [...prevTasks, newTask]);
  };

  const handleEdit = (taskId) => {
    const taskToEdit = taskList.find((task) => task.id === taskId);
    setSelectedTask(taskToEdit);
    setIsEditing(true);
    setIsViewing(false);
  };

  const handleDelete = (taskId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres borrar esta tarea?"
    );
    if (confirmDelete) {
      const updatedTasks = taskList.filter((task) => task.id !== taskId);
      setTaskList(updatedTasks);
    }
  };

  const handleShowDetails = (taskId) => {
    const taskToShow = taskList.find((task) => task.id === taskId);
    setSelectedTask(taskToShow);
    setIsViewing(true);
    setIsEditing(false);
  };

  const saveEditedTask = (updatedTask) => {
    const updatedTasks = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(updatedTasks);
    setIsEditing(false);
    setSelectedTask(null);
  };

  const handleAddCompany = () => {
    const companyName = prompt("Ingrese el nombre de la empresa:");
    if (companyName) {
      setCompanies((prev) => [...prev, companyName]);
    }
  };

  const handleAddArea = () => {
    const areaName = prompt("Ingrese el nombre del área:");
    if (areaName) {
      setAreas((prev) => [...prev, areaName]);
    }
  };

  const handleDeleteCompany = (company) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar la empresa "${company}"?`
    );
    if (confirmDelete) {
      setCompanies((prev) => prev.filter((c) => c !== company));
    }
  };

  const handleDeleteArea = (area) => {
    const confirmDelete = window.confirm(
      `¿Estás seguro de que quieres eliminar el área "${area}"?`
    );
    if (confirmDelete) {
      setAreas((prev) => prev.filter((a) => a !== area));
    }
  };

  const handleMarkAsCompleted = (taskId) => {
    const taskToComplete = taskList.find((task) => task.id === taskId);
    if (taskToComplete) {
      const updatedTask = { ...taskToComplete, status: "terminada" };
      setTaskList((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskId)
      );
      setCompletedTasks((prevTasks) => [...prevTasks, updatedTask]);
    }
  };

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
                  <i className="fa-solid fa-boxes-stacked"></i>{" "}
                  {taskList.length} tareas
                </span>
              </div>
            </div>
            <div>
              <button
                style={{ marginRight: "10px" }}
                onClick={handleCreateTask}
              >
                <i className="fa-solid fa-plus"></i> Crear Tarea
              </button>
              <button onClick={handleAddCompany}>
                <i className="fa-solid fa-building"></i> Añadir Empresa
              </button>
              <button onClick={handleAddArea}>
                <i className="fa-solid fa-pen-to-square"></i> Añadir Área
              </button>
              {/* Sección de empresas */}
            </div>
          </div>
          <div className="MediunBox">
            <span>
              <i className="fa-solid fa-spinner"></i> En Progreso
            </span>
            <SelectDeleteAreaEmpress
              companies={companies}
              areas={areas}
              onDeleteCompany={handleDeleteCompany}
              onDeleteArea={handleDeleteArea}
            />
          </div>
          <TaskTable
            tasks={taskList}
            users={users}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShowDetails={handleShowDetails}
            onComplete={handleMarkAsCompleted}
          />
        </div>
        <TaskToComplete
          completedTasks={completedTasks}
          taskList={taskList}
          setTaskList={setTaskList}
          users={users}
          formatDate={formatDate}
        />
      </main>
      {isEditing && selectedTask && (
        <EditModal
          task={selectedTask}
          onSave={saveEditedTask}
          users={users}
          areas={areas}
          companies={companies}
          setIsEditing={setIsEditing}
        />
      )}

      {isViewing && selectedTask && (
        <DetailsModal
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          formatDate={formatDate}
        />
      )}
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
      userImage: PropTypes.string,
    })
  ).isRequired,
  panel: PropTypes.func.isRequired,
};

export default PanelControlTask;
