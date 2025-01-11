
const DetailsModal = ({ selectedTask, setSelectedTask, formatDate }) => {
  return (
 <div className="details-modal">
           <h3>Detalles de la tarea</h3>
           <p>
             <strong>Título:</strong> {selectedTask.title}
           </p>
           <p>
             <strong>Descripción:</strong> {selectedTask.observation}
           </p>
           <p>
             <strong>Asignado a:</strong> {selectedTask.user}
           </p>
           <p>
             <strong>Fecha límite:</strong> {formatDate(selectedTask.deadline)}
           </p>
           <p>
             <strong>Área:</strong> {selectedTask.projects}
           </p>
           <p>
             <strong>Empresa:</strong> {selectedTask.company}
           </p>
           <button onClick={() => setSelectedTask(null)}>Cerrar</button>
         </div>
  )
}

import PropTypes from 'prop-types';

DetailsModal.propTypes = {
  selectedTask: PropTypes.shape({
    title: PropTypes.string,
    observation: PropTypes.string,
    user: PropTypes.string,
    deadline: PropTypes.string,
    projects: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
  setSelectedTask: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default DetailsModal;
