import React, {useState, useEffect} from 'react';
import Calendar from 'react-calendar';
import {add, format} from 'date-fns'
import axios from 'axios';
import './EventsCalendar.css'
import { CLOSING_TIME, OPENING_TIME, SPORT_GAME_DURATION } from '../../../constants/config';
const EventsCalendar = () => {
  // eslint-disable-next-line no-undef
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });

  const id = sessionStorage.getItem('id');

  const [tereni, setTereni] = useState(["Vistafon", "La Bombonjera", "Grbavica"])


  const getTimes = ()=> {
    if(!date.justDate) return

    const {justDate} = date

    const beginning = add(justDate, {hours: OPENING_TIME})
    const end = add(justDate, {hours: CLOSING_TIME})
    const interval = SPORT_GAME_DURATION


    const times = []
    for (let i = beginning; i<=end; i = add(i, {minutes: interval})){
      times.push(i)
    }
    return times
  }

  const times = getTimes()

  function fetchSportHalls() {
    axios.get(`http://127.0.0.1:8000//get_sport_halls_by_user/${id}/`).then((response) => {
      setTereni(response.data);
      console.log(response.data);
    }, (error) => {
      console.log(error);
    }
    );
  }

  useEffect(() => {
    fetchSportHalls()
  }, []);

  return (
    <>
    <div>
      <div className="form-group">
        Odaberite teren: 
        <select name="numberOfPlayers">
          {tereni.map((teren, index) => (
            <option key={index} value={teren}>
              {teren}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
         <Calendar 
         minDate={new Date()}
         className="REACT-CALENDAR p-2"
         view='month'
         onClickDay={(date)=>setDate((prev) => ({...prev, justDate: date}))}
         />
    </div>
    </>
    
  );
};

export default EventsCalendar;
