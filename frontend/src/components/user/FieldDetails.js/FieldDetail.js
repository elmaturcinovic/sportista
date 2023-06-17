import React, {useEffect, useState} from 'react'
import EventsCalendar from '../EventsCalendar/EventsCalendar'
import AboutField from '../AboutField/AboutField'
import SideBarComp from '../SideBarComp'
import UserFieldCard from '../UserFieldCard'
import useStyles from './styles'
import './../styles_user.css'

import { useLocation } from 'react-router-dom';
import axios from "axios";
import { format, startOfDay } from 'date-fns';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

function FieldDetail() {
    const id = sessionStorage.getItem('id');
    const { sportHallId } = useParams();
    const classes = useStyles()
    const [user, setUser] = useState([]);
    const [appointments,setAppointments]= useState([])
    const [sportHall,setSportHall] = useState([])
    const [formattedDate, setFormattedDate] = useState(format(new Date(), 'dd.MM.yyyy.'));
    const [showAppointments, setShowAppointments] = useState(false);

    useEffect(() => {
        const fetchSportHallData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000//get_sport_hall_by_id/${sportHallId}/`);
            setSportHall(response.data);
            console.log(response.data)
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchSportHallData();
      }, [sportHallId]);
 
      useEffect(() => {
        const fetchAppointmentsData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000//get_appointments_by_sport_hall/${sportHallId}/`);
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
        setShowAppointments(true);
      };

      function fetchUser(id) {
        axios
          .get(`http://127.0.0.1:8000/get_user/${id}/`)
          .then((response) => {
            setUser(response.data);
            sessionStorage.setItem('image', user.user_photo)
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
  
      useEffect(() => {
        fetchUser(id);
      }, [id]);  

  return (
    <div className="field-details-div">
        <div className={classes.userProfileInfo}>
            <SideBarComp
              user={user}
              fetchUser={fetchUser}
            />
        </div>
        <div className={classes.fieldDetails}>
            <div className="schedule-first-div">
              <div className="schedule-first-div">
                  <h2 id="heading-h2">{sportHall.name}</h2>
              </div>
              <div><AboutField item={sportHall}/></div>
              <div className="schedule-first-div">
                  <h2 id="heading-h2">Rezervacija termina</h2>
              </div>
              <div className='reservation-wrapper'>
                <div className={classes.reserveFieldContainer}>                
                  <div className={classes.calendar}>
                    <h3>Odaberi datum:</h3>
                    <EventsCalendar onDateChange={handleDateChange}/>
                  </div>
                  {showAppointments &&
                  <div className={classes.timeWrapper}>
                    <h3>Odaberi termin:</h3>
                    <div className={classes.time}>
                      <div className={classes.aboutFieldTitle}>{formattedDate}</div>
                      <div className={classes.scrollViewCard}>
                          {appointments.map((appointment) => (
                              <UserFieldCard key={appointment.id} appointment={appointment} />
                          ))}
                      </div>  
                    </div>
                  </div>   
                  }  
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default FieldDetail