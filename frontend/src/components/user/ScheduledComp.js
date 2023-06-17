import React, { useEffect, useState } from "react";
import DropDownComp from "./DropDownComp";
import CardComp from "./CardComp";
import axios from 'axios';
import DropDownCompSports from "./DropdownCompSports";

const ScheduledComp = () => {
    const [sportCities, setSportCities] = useState([]);
    const [selectedSport, setSelectedSport] = useState();
    const [selectedCity, setSelectedCity] = useState("");
    const [sports, setSports] = useState([]);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/get_sports/').then((response) => {
            setSports(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error);
        }
        );
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

    const [sportHalls, setSportHalls] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    useEffect(() => {
        fetchSportHalls();
    }, []);

    const fetchSportHalls = () => {
        axios
        .get('http://127.0.0.1:8000/get_all_sports_halls/')
        .then((response) => {
            setSportHalls(response.data);
            setFilteredData(response.data)
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const handleCityChange = (selectedValue) => {
        setSelectedCity(selectedValue);
        console.log(selectedValue); // Updated selectedCity value
    };

    const handleSportChange = (selectedValue) => {
        setSelectedSport(selectedValue);
        console.log(selectedValue); // Updated selectedSport value
    };


    const handleFilterSubmit = (e) => {
        e.preventDefault();
        console.log(selectedCity, selectedSport)
        const selectedSportInt = parseInt(selectedSport);

        const filteredSportHalls = sportHalls.filter((sportHall) => {
            if (selectedCity !== '' && sportHall.city !== selectedCity) {
                return false;
            }
            if (selectedSport !=='') {
                console.log(sportHall.sports)
                console.log(selectedSport)
                const sportHallSports = new Set(sportHall.sports.map((sport) => sport));
                console.log(sportHallSports.has(selectedSportInt))
                if (!sportHallSports.has(selectedSportInt)) {    //has umjesto includes mozda
                    return false;
                }
            }
            return true;
        });

        console.log(filteredSportHalls)
        setFilteredData(filteredSportHalls);
    };

    const handleFilterReset = (e) => {
        setSelectedCity('')
        setSelectedSport()
        setFilteredData(sportHalls)
    }


    return (
        <div className="schedule-main-div">
            <div className="schedule-first-div">
                <h2 id="heading-h2">Sportski tereni</h2>
            </div>
            <div className="schedule-first-div">
                <DropDownCompSports
                    label="Sport:"
                    showLabel={true}
                    selected={selectedSport}
                    options={sports}
                    onChange={handleSportChange}
                />
                <DropDownComp
                    label="Grad:"
                    selected={selectedCity}
                    options={sportCities}
                    onChange={handleCityChange}
                />
                <div className="buttons">
                    <button className="filter-button" onClick={handleFilterSubmit}>
                        Filtriraj terene
                    </button>
                    <button className="reset-filter" onClick={handleFilterReset}>
                        Poništi filtere
                    </button>
                </div>
            </div>
            <div className="schedule-second-div">
                <CardComp sportHalls={filteredData} />
            </div>
        </div>
    );
}

export default ScheduledComp;
