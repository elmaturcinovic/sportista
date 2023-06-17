import React, {useEffect, useState} from 'react'
import EventsCalendar from '../EventsCalendar/EventsCalendar'
import AboutField from '../AboutField/AboutField'
import SideBarComp from '../SideBarComp'
import UserFieldCard from '../UserFieldCard'
import useStyles from './styles'
import './../styles_user.css'
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


    const fetchAppointmentsData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000//get_appointments_by_sport_hall/${sportHallId}/`);
        const filteredAppointments = response.data.filter(appointment => {
          return appointment.date === formattedDate;
        });
        console.log("filtered appintments:")
        console.log(filteredAppointments)

    
        const userAppointmentsResponse = await axios.get(`http://127.0.0.1:8000//get_user_appointments_by_appointments/`, {
          params: {
            appointmentIds: filteredAppointments.map(appointment => appointment.id)
          }
        });
        console.log("appointment ids")
        console.log(filteredAppointments.map(appointment => appointment.id))
    
        const userAppointments = userAppointmentsResponse.data;
        console.log("user appointments")
        console.log(userAppointments)
    
        const mergedAppointments = filteredAppointments.map(appointment => {
          const userAppointment = userAppointments.find(userAppointment => userAppointment.appointment === appointment.id);
          if (userAppointment) {
            appointment = {
              ...appointment,
              ...userAppointment,
              booked: true,
              availableSpots: userAppointment.available_spots
            };
          } else {
            appointment.booked = false;
            appointment.availableSpots = appointment.capacity
          }
          return appointment;
        });
        console.log("merged appointments")
        console.log(mergedAppointments)
    
        setAppointments(mergedAppointments);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSportHallData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000//get_sport_hall_by_id/${sportHallId}/`);
        setSportHall(response.data);
        //console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };


    useEffect(() => {
        fetchSportHallData();
      }, [sportHallId]);
 
    useEffect(() => {
      fetchAppointmentsData();
      console.log(appointments)
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
                      
                      <div className={classes.scrollViewCard}>
                      {appointments.map((appointment) => (
                        <UserFieldCard
                          key={appointment.id}
                          appointment={appointment}
                          booked={appointment.booked}
                          availableSpots1={appointment.availableSpots}
                          fetchAppointmentsData={fetchAppointmentsData}
                        />
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