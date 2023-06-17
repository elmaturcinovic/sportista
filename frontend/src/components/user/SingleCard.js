import React, { useEffect, useState } from 'react';
import { useHistory, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';


const SingleCard = ({item}) => {
    const [sportNames, setSportNames] = useState([]);

    const history = useHistory();

    useEffect(()=>{
        fetchSportNames(item.sports);
    }, [item])

    const navigateToSportHallDetails = (sportHallId) => {
        history.push(`/teren-detalji/${sportHallId}`);
    };

    function fetchSportNames(sportIds) {
        console.log(sportIds)
        axios
        .get(`http://127.0.0.1:8000/get_sport_names_selected/`, {
            params: { sportIds: sportIds },
        })
        .then((response) => {
            setSportNames(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

  return (
    <div key={item.id} className="one-card">
        <div className="image-container">
            <img
            id="company-image-card"
            src={`http://localhost:8000${item.photo}`}
            alt="Slika dvorane"
            className="image-size"
            />
        </div>
        <div className="content-container">
            <h2 id="company-name-card">{item.name}</h2>
            <h5 id="company-address-card">{item.address}, {item.city}</h5>
            <h6 id="company-sports-card">
                {sportNames.map((sport) => sport).join(', ')}
            </h6>
            <button className="button-card" onClick={() => navigateToSportHallDetails(item.id)}>Detalji</button>
        </div>
    </div>
  )
}

export default SingleCard