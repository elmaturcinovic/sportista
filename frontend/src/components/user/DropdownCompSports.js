import React, { useState } from 'react';
import './styles_user.css'


const DropDownCompSports = ({ label, selected, showLabel, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue); // Call the onChange prop with the selected value
  };

  return (
    <div className='custom-drop-down'>
        {showLabel&&
        <label htmlFor="dropdown" id="label-drop">{label}</label>}
        <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
            <option value="">Odaberite {label.toLowerCase()} </option>
            {options && options.map((option, index) => (
            <option key={index} value={option.id}>
                {option.sport_name}
            </option>
            ))}
        </select>
        </div>
  );
};

export default DropDownCompSports;
