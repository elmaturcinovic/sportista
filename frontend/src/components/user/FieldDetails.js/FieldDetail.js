import React, {useEffect, useState} from 'react'
import EventsCalendar from '../../Companies/EventsCalendar/EventsCalendar'
import AboutField from '../../shared/AboutField/AboutField'
import SideBarComp from '../SideBarComp'
import UserFieldCard from '../UserFieldCard'
import useStyles from './styles'
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { format, startOfDay } from 'date-fns';

function FieldDetail() {
    const classes = useStyles()

    const location = useLocation();
    const item = location.state?.item;
    const [appointments,setAppointments]= useState([])
    const [sportHall,setSportHall] = useState([])
    const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    useEffect(() => {
        const fetchSportHallData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000//get_sport_hall_by_id/${item.id}/`);
            setSportHall(response.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchSportHallData();
      }, [item.id]);
 
      useEffect(() => {
        const fetchAppointmentsData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000//get_appointments_by_sport_hall/${sportHall.id}/`);
            const filteredAppointments = response.data.filter(appointment => {
                return appointment.date === formattedDate;
            });
            setAppointments(filteredAppointments);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchAppointmentsData();
      }, [sportHall.id, formattedDate]); 

      const today = format(new Date(), 'yyyy-MM-dd');

      const handleDateChange = (newDate) => {
        const date = startOfDay(newDate);
        const newFormattedDate = format(date, 'yyyy-MM-dd');
        setFormattedDate(newFormattedDate);
      };

  return (
    <div className={classes.container}>
        <div className={classes.userProfileInfo}>
            <SideBarComp/>
        </div>
        <div className={classes.fieldDetails}>
            <div><AboutField item={item}/></div>
            <div className={classes.reserveFieldContainer}>
                
                <div className={classes.time}>
                    <div className={classes.aboutFieldTitle}>Termini za {sportHall.name} za {formattedDate}</div>
                    <div className={classes.scrollViewCard}>
                        {appointments.map((appointment) => (
                            <UserFieldCard key={appointment.id} appointment={appointment} />
                        ))}
                    </div>
                    
                </div>
                <div className={classes.calendar}><EventsCalendar onDateChange={handleDateChange}/></div>
            </div>
        </div>
    </div>
  )
}

export default FieldDetail