import React, { useState } from 'react';

const DropdownInput = (props) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <label htmlFor="dropdown" id="label-drop">{props.label}</label>
            <select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
                <option value={props.option1}>{props.option1}</option>
                <option value={props.option2}>{props.option2}</option>
                <option value={props.option3}>{props.option3}</option>
                <option value={props.option4}>{props.option4}</option>
            </select>
            <p id="selected">Selektovan {props.selected}: {selectedOption}</p>
        </div>
    );
};

export default DropdownInput;
