import React, { useEffect, useState } from "react";
import DropDownComp from "./DropDownComp";
import CardComp from "./CardComp";
import axios from 'axios';

const ScheduledComp = () => {
    const [sportNames, setSportNames] = useState([]);
    const [sportCities, setSportCities] = useState([]);
    const [selectedSport, setSelectedSport] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [isFiltered, setIsFiltered] = useState(false); 

//da se povuku sportovi
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/get_sport_names/")
            .then(response => {
                const sportNames = response.data.sport_names;
                setSportNames(sportNames);
                console.log("Povuceni sportovi: ", sportNames)
            })
            .catch(error => {
                console.error("Greska povlacenja sportova:", error);
            });
    }, []);
//da se povuku gradovi
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/get_sport_cities/")
            .then(response => {
                const sportCities = response.data.sport_cities;
                setSportCities(sportCities);
                console.log("Povuceni gradovi: ", sportCities)
            })
            .catch(error => {
                console.error("Greska povlacenja gradova:", error);
            });
    }, []);

    const handleFilterClick = () => {
        setIsFiltered(true);
    };

    return (
        <div className="schedule-main-div">
            <div className="schedule-first-div">
                <h2 id="heading-h2">Sportski termini</h2>
            </div>
            <div className="schedule-first-div">
                <DropDownComp
                    label="Sport:"
                    selected={selectedSport}
                    options={sportNames}
                    onChange={(value) => setSelectedSport(value)}
                />
                <DropDownComp
                    label="Grad:"
                    selected={selectedCity}
                    options={sportCities}
                    onChange={(value) => setSelectedCity(value)}
                />
                <button className="filter-button" onClick={handleFilterClick}>
                    Pretraži termine
                </button>
            </div>
            {isFiltered ? ( 
                <div className="schedule-second-div">
                    <CardComp sport={selectedSport} city={selectedCity} />
                </div>
            ) : (
                <div className="schedule-second-div">
                    <CardComp/>
                </div>
            )}
        </div>
    );
}

export default ScheduledComp;
