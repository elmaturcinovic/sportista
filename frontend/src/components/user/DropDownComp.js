import React, { useState } from 'react';

// samo jos da se update-a kad se oznaci neki sport

const DropDownComp = ({label, selected, options}) => {

    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
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

            <p id="selected">Selektovan {label.toLowerCase()} {selectedOption}</p>
        </div>
    );
};

export default DropDownComp;
