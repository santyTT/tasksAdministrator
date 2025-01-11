// import React from 'react'
import "./DeleteAP.css"


const selectDeleteAP = ({ companies, areas, onDeleteCompany, onDeleteArea}) => {
  return (
    <div>
      <div className="deleteAP">
        <div className="selectionMenu">
          <div className="selectWrapper">
            <select className="selectBox" defaultValue="">
                <option value="" disabled>Empresa a borrar</option>
              {companies.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <div className="buttonList">
              {companies.map((company, index) => (
                <button
                  key={index}
                  className="deleteButton"
                  onClick={() => onDeleteCompany(company)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sección de áreas */}
        <div className="selectionMenu2">
          <div className="selectWrapper">
            <select className="selectBox" defaultValue="">
                <option value="" disabled>Area a borrar</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>
                  {area}
                </option>
              ))}
            </select>
            <div className="buttonList">
              {areas.map((area, index) => (
                <button
                  key={index}
                  className="deleteButton"
                  onClick={() => onDeleteArea(area)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default selectDeleteAP;
