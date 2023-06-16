import React from 'react';

const DropDownComp = ({ label, selected, options, onChange }) => {
    const handleOptionChange = (event) => {
        onChange(event.target.value); // Pass the selected value to the parent component
    };

    return (
        <div>
            <label htmlFor="dropdown" id="label-drop">{label}</label>
            <select id="dropdown" value={selected} onChange={handleOptionChange}>
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
