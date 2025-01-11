import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DropdownMenu from "../modules/AccionsTasks";
import "./BoxTask2.css";

// Define or import the formatDate function
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

const TaskTable = ({
  tasks,
  users,
  onEdit,
  onDelete,
  onShowDetails,
  onComplete,
  onDragEnd,
}) => (
  <div className="boxTask2">
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <table
            className="task-table"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
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
                  <i className="fa-solid fa-hourglass-half"></i> Limite
                </th>
                <th>
                  <i className="fa-solid fa-pen-to-square"></i> Área
                </th>
                <th>
                  <i className="fa-solid fa-building"></i> Empresa
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <td>{task.title}</td>
                      <td>{task.observation}</td>
                      <td>
                        {users.find((user) => user.email === task.user) ? (
                          <div className="user-email-container">
                            <i className="fa-regular fa-user"></i>
                            <div className="tooltip">{task.user}</div>
                          </div>
                        ) : (
                          <span>No seleccionado</span>
                        )}
                      </td>
                      <td >
                        {formatDate(task.deadline)}{" "}
                        {task.time ? formatDate(task.time) : ""}
                      </td>
                      <td>{task.projects || "Asigna Area"}</td>
                      <td >{task.company || "asigna Empresa"}</td>
                      <td className="edit-fill">
                        <DropdownMenu
                          taskId={task.id}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          onShowDetails={onShowDetails}
                          onComplete={onComplete}
                        />
                      </td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
  </div>
);

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onShowDetails: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default TaskTable;
