import React, {useEffect, useState} from 'react';
import { useHistory, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

const CardComp = () => {

    const [sportHalls, setSportHalls] = useState([]);

    function fetchSportHalls() {
        axios.get(`http://127.0.0.1:8000/get_all_sports_halls/`).then((response) => {
          setSportHalls(response.data);
          console.log(response.data);
        }, (error) => {
          console.log(error);
        }
        );
      }

    useEffect(() => {
        fetchSportHalls()
      }, []);


    const history = useHistory();
    const handleCard = (item) => {
        history.push({
          pathname: '/field-detail',
          state: { item }
        });
      };

    return (
        <Router>
        <div className="cards">
            {sportHalls.map((item) => (
                <div key={item.id} className="one-card">
                    <div className="image-container"> 
                        <img id="company-image-card" src={`http://localhost:8000${item.photo}`} alt="Slika dvorane" className="image-size"/>
                    </div>
                    <div className="content-container">
                        <h2 id="company-name-card">{item.name}</h2>
                        <h5 id="company-address-card">{item.address}</h5>
                        <button className="button-card" onClick={() => handleCard(item)}>Klik za više detalja</button>
                    </div>      
                </div>
            ))}
        </div>
        </Router>
    );
};

export default CardComp;
