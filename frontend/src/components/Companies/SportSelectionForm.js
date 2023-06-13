import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './styles_companies.css';

const SportSelectionForm = ({ sports, selectedSports, setSelectedSports, handleFormSubmit }) => {
  
  const handleCheckboxChange = (e) => {
    const selectedSportId = parseInt(e.target.value);
    console.log(selectedSportId)
    if (selectedSports.includes(selectedSportId)) {
      setSelectedSports((prevSelectedSports) =>
        prevSelectedSports.filter((sportId) => sportId !== selectedSportId)
      );
      console.log(selectedSports)
    } else {
      setSelectedSports((prevSelectedSports) => [
        ...prevSelectedSports,
        selectedSportId,
      ]);
      console.log(selectedSports)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <div className="selection-form">
      <h3>Uredi sportove:</h3>
      <form onSubmit={handleSubmit}>
        {sports.map((sport) => (
          <div key={sport.id} className="form-check">
            <input
              type="checkbox"
              id={`sport-${sport.id}`}
              value={sport.id}
              checked={selectedSports.includes(sport.id)}
              onChange={handleCheckboxChange}
              className="form-check-input"
            />
            <label htmlFor={`sport-${sport.id}`} className="form-check-label">
              {sport.sport_name}
            </label>
          </div>
        ))}
        <br></br>
        <button type="submit" className='add-button'>
          Spremi izmjene
        </button>
      </form>
    </div>
  );
};

export default SportSelectionForm;
