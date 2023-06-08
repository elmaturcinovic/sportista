import React, {useState} from 'react';
import Calendar from 'react-calendar';
import {add, format} from 'date-fns'
import './EventsCalendar.css'
import { CLOSING_TIME, OPENING_TIME, SPORT_GAME_DURATION } from '../../../constants/config';
const EventsCalendar = () => {
  // eslint-disable-next-line no-undef
  const [date, setDate] = useState({
    justDate: null,
    dateTime: null,
  });
  console.log(date.dateTime)
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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {date.justDate ? (
        <div>
          {times?.map((time,index)=>(
            <div key={`time-${index}`}  className='rounded-sm bg-gray-100 p-2'>
              <button type='button' onClick={()=>setDate((prev)=> ({...prev, dateTime: time}))}>
                {format(time,'kk:mm')}
              </button>
            </div>
            
          ))}
        </div>
      ) :(
         <Calendar 
         minDate={new Date()}
         className="REACT-CALENDAR p-2"
         view='month'
         onClickDay={(date)=>setDate((prev) => ({...prev, justDate: date}))}
         />
      )}
     
    </div>
  );
};

export default EventsCalendar;
