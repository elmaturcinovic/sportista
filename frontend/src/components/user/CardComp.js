import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CardComp = ({ sport, city }) => {

  const [divData, setDivData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/get_all_sport_halls/`);
        let filteredData = response.data;

        if (sport && city) {
          filteredData = filteredData.filter(item => (
            item.fields.sports.includes(sport) && item.fields.city === city
          ));
        } else if (sport) {
          filteredData = filteredData.filter(item => item.fields.sports.includes(sport));
        } else if (city) {
          filteredData = filteredData.filter(item => item.fields.city === city);
        }

        setDivData(filteredData);
        console.log(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sport, city]);

  const handleCard = () => {
    history.push('/field-detail');
  };

  return (
    <div className="cards">
      {divData.map((item) => (
        <div key={item.fields.id} className="one-card">
          <img id="company-image-card" src={`http://127.0.0.1:8000/${item.fields.photo}`} alt="Slika dvorane" />
          <h2 id="company-name-card">{item.fields.name}</h2>
          <h5 id="company-address-card">{item.fields.address}</h5>
          <button className="button-card" onClick={handleCard}>
            Klik za više detalja
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardComp;
