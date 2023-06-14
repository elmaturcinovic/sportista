import React, {useState,useEffect} from 'react';
import Calendar from 'react-calendar';
import {add, startOfDay, format} from 'date-fns'
import './EventsCalendar.css'
import axios from 'axios';
import { CLOSING_TIME, OPENING_TIME, SPORT_GAME_DURATION } from '../../../constants/config';
const EventsCalendar = () => {
  // eslint-disable-next-line no-undef
  const [date, setDate] = useState({
    justDate: new Date(),
    dateTime: null,
  });
  var id = sessionStorage.getItem('id');
  const [tereni, setTereni] = useState()


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

  useEffect(() => {
    const logClickedDate = () => {
      if (date.justDate) {
        const formattedDate = format(date.justDate, 'yyyy MMM dd');
        console.log(formattedDate);
      }
    };

    logClickedDate(); 
    return () => {
      logClickedDate();
    };
  }, [date.justDate]); 
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
         onClickDay={(date)=>setDate((prev) => ({...prev, justDate: startOfDay(date)}))}
         />
    </div>
    </>
    
  );
};

export default EventsCalendar;
