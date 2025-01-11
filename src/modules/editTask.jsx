// import React from 'react'

const editTask = ({ task, users, areas, companies, setIsEditing, onSave }) => {
  return (
    <div className="edit-modal">
    <h3>Editar Tarea</h3>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const updatedTask = {
          ...task,
          title: e.target.title.value,
          observation: e.target.observation.value,
          user: e.target.user.value,
          deadline: e.target.deadline.value,
          projects: e.target.projects.value,
          company: e.target.company.value,
        };
        onSave(updatedTask);
      }}
    >
      <div>
        <label>Título</label>
        <input
          type="text"
          name="title"
          defaultValue={task.title}
        />
      </div>
      <div>
        <label>Descripción</label>
        <textarea
          name="observation"
          defaultValue={task.observation}
        ></textarea>
      </div>
      <div>
        <label>Persona</label>
        <select name="user" defaultValue={task.user}>
          {users.map((user) => (
            <option key={user.email} value={user.email}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha límite</label>
        <input
          type="date"
          name="deadline"
          defaultValue={task.deadline}
        />
      </div>
      <div>
        <label>Área</label>
        <select name="projects" defaultValue={task.projects}>
          {areas.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Empresa</label>
        <select name="company" defaultValue={task.company}>
          {companies.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Guardar cambios</button>
      <button type="button" onClick={() => setIsEditing(false)}>
        Cancelar
      </button>
    </form>
  </div>
  )
}

export default editTask
