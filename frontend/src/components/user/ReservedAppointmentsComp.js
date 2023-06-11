import React, { useEffect, useState } from "react";
import CardComp from "./CardComp";
import axios from 'axios';

const id_usera = sessionStorage.getItem('id');

const ReservedAppointmentsComp = () => {

    const [data, setData] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/get_sport_halls_by_user/'+ id_usera +'/');
        setData(response.data);
        // uzima name, address i photo
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="schedule-main-div">
        <div className="schedule-first-div">
          <h2 id="heading-reserved">Rezervirani termini</h2>
        </div>
        <div className="schedule-second-div">
          <CardComp data={data}/>
        </div>
      </div>
    );
};
  

export default ReservedAppointmentsComp;