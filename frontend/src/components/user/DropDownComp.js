import React from 'react';
import { useState } from 'react';

const DropDownComp = ({ label, selected, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue); // Call the onChange prop with the selected value
  };

  return (
    <div>
      <label htmlFor="dropdown" id="label-drop">{label}</label>
      <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="">Odaberite {label.toLowerCase()} </option>
        {options && options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownComp;
