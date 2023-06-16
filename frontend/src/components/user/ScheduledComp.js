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

    // Fetch sport names
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

    // Fetch sport cities
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

    const handleSportChange = (value) => {
        setSelectedSport(value);
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
    };
    useEffect(() => {
        var filter_sport = 0;
        if(selectedSport === "Nogomet"){
            filter_sport = 0;
        }
        else if(selectedSport === "Košarka"){
            filter_sport = 1;
        }
        console.log("Korisnik je izabrao grad: ", selectedCity);
      }, [selectedCity]);
      useEffect(() => {
        console.log("Korisnik je izabrao sport: ", selectedSport);
      }, [selectedSport]);  



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
                    onChange={handleSportChange}
                />
                <DropDownComp
                    label="Grad:"
                    selected={selectedCity}
                    options={sportCities}
                    onChange={handleCityChange}
                />
                <button className="filter-button" onClick={handleFilterClick}>
                    Pretraži termine
                </button>
            </div>
            {isFiltered ? ( 
                <div className="schedule-second-div">
                    <CardComp sport={selectedSport} city={selectedCity}/>
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
