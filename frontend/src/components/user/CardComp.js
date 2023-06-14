import React, {useEffect, useState} from 'react';
import { useHistory, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

const CardComp = () => {

    const [sportHalls, setSportHalls] = useState([]);
    const Data = [
        { id: 1, name: 'Dvorana 101', address: "Main street NU1231", price: "100$", email: "dvorana01@gmail.com",phone: "033 452 323"},
        { id: 2, name: 'Dvorana 102', address: "Main street NU1232", price: "140$", email: "dvorana02@gmail.com",phone: "033 452 323"},
        { id: 3, name: 'Dvorana 103', address: "Main street NU1233", price: "130$", email: "dvorana03@gmail.com",phone: "033 452 323"},
        { id: 4, name: 'Dvorana 104', address: "Main street NU1234", price: "70$", email: "dvorana04@gmail.com",phone: "033 452 323"},
        { id: 5, name: 'Dvorana 105', address: "Main street NU1235", price: "60$", email: "dvorana05@gmail.com",phone: "033 452 323"},
        { id: 6, name: 'Dvorana 106', address: "Main street NU1236", price: "120$", email: "dvorana06@gmail.com",phone: "033 452 323"},
        { id: 7, name: 'Dvorana 107', address: "Main street NU1237", price: "103$", email: "dvorana07@gmail.com",phone: "033 452 323"},
        { id: 8, name: 'Dvorana 108', address: "Main street NU1238", price: "120$", email: "dvorana08@gmail.com",phone: "033 452 323"},
    ];

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
