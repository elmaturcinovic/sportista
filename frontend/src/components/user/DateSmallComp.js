import React, { useState } from 'react';

const DateSmallComp = (props) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <label htmlFor="dropdown" id="label-date">{props.label}</label>
            <input
                type="date"
                id="dateInput"
                value={selectedOption}
                onChange={handleOptionChange}
            />
            <p id="selected">Selektovan {props.date}: {selectedOption}</p>
        </div>
    );
};

export default DateSmallComp;
