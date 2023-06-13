import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles_companies.css';


const WorkingTimeSelection = ({ sportHall, handleFormSubmit }) => {
  const [workTimeBegin, setWorkTimeBegin] = useState(sportHall.work_time_begin);
  const [workTimeEnd, setWorkTimeEnd] = useState(sportHall.work_time_end);

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    if (name === 'workTimeBegin') {
      setWorkTimeBegin(value);
    } else if (name === 'workTimeEnd') {
      setWorkTimeEnd(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSportHall = {
      ...sportHall,
      work_time_begin: workTimeBegin,
      work_time_end: workTimeEnd,
    };
    handleFormSubmit(updatedSportHall);
  };

  return (
    <div className='selection-form'>
        <h3>Uredi radno vrijeme:</h3>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>
                Početak radnog vremena:
                <input type="time" name="workTimeBegin" value={workTimeBegin || '00:00'} onChange={handleTimeChange} />
                </label>
            </div>
            <div className="form-group">
                <label>
                Kraj radnog vremena:
                <input type="time" name="workTimeEnd" value={workTimeEnd || '00:00'} onChange={handleTimeChange} />
                </label>
            </div>
            <br></br>
            <div className="form-group">
                <button type="submit" className='add-button'>Spremi izmjene</button>
            </div>
        </form>
    </div>
    
  );
};

export default WorkingTimeSelection;