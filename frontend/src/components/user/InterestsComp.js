import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InterestsComp = () => {
  const [sportNames, setSportNames] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    fetchSportNames();
  }, []);

  const fetchSportNames = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/get_sport_names/');
      setSportNames(response.data.sport_names);
    } catch (error) {
      console.error('Greska povlacenja imena sportova:', error);
    }
  };

  const handleAddInterest = () => {
    if (selectedSport && !interests.includes(selectedSport)) {
      setInterests([...interests, selectedSport]);
    }
    setSelectedSport('');
  };

  const handleRemoveInterest = (interest) => {
    const updatedInterests = interests.filter((item) => item !== interest);
    setInterests(updatedInterests);
  };

  return (
    <div>
      <table className="table-two">
        <tfoot>
          <tr>
            <td></td>
            <td>
          <div>
            {interests.map((interest) => (
              <button
                key={interest}
                className="interests"
                onClick={() => handleRemoveInterest(interest)}
              >
                {interest} &times;
              </button> 
            ))}
          </div>
          </td>
          </tr>
        </tfoot>
        <tbody>
          <tr>
            <td>Interesi:</td>
            <td>
              <select
                value={selectedSport}
                id='add-interest'
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="" disabled hidden>
                  Odaberi sport
                </option>
                {sportNames.map((sportName) => (
                  <option key={sportName} value={sportName}>
                    {sportName}
                  </option>
                ))}
              </select>
              <button onClick={handleAddInterest} className='add-interest'>Dodaj</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InterestsComp;

