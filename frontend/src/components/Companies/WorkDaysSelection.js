import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles_companies.css';


const WorkDaysSelection = ({ sportHall, allDays, handleFormSubmit, selectedWorkDays, setSelectedWorkDays }) => {
  
    const handleCheckboxChange = (e) => {
      const selectedWorkDayId = parseInt(e.target.value);
      console.log(selectedWorkDayId)
      if (selectedWorkDays.includes(selectedWorkDayId)) {
        setSelectedWorkDays((prevSelectedWorkDays) =>
          prevSelectedWorkDays.filter((workDayId) => workDayId !== selectedWorkDayId)
        );
        console.log(selectedWorkDays)
      } else {
        setSelectedWorkDays((prevSelectedWorkDays) => [
          ...prevSelectedWorkDays,
          selectedWorkDayId,
        ]);
        console.log(selectedWorkDays)
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleFormSubmit();
    };
  
    return (
        <div className='selection-form'>
            <h3>Uredi radne dane:</h3>
            <form onSubmit={handleSubmit}>
                {allDays.map((day) => (
                    <div key={day.id} className="form-check">
                    <input
                      type="checkbox"
                      id={`day-${day.id}`}
                      value={day.id}
                      checked={selectedWorkDays.includes(day.id)}
                      onChange={handleCheckboxChange}
                      className="form-check-input"
                    />
                    <label htmlFor={`day-${day.id}`} className="form-check-label">
                      {day.name}
                    </label>
                  </div>
                ))}
                <br></br>
                <div className="form-group">
                    <button type="submit" className='add-button'>Sačuvaj izmjene</button>
                </div>
            </form>
        </div>
      
    );
  };

export default WorkDaysSelection