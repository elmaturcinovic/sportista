import React, {useEffect, useState} from 'react'
import EventsCalendar from '../../Companies/EventsCalendar/EventsCalendar'
import AboutField from '../../shared/AboutField/AboutField'
import SideBarComp from '../SideBarComp'
import UserFieldCard from '../UserFieldCard'
import useStyles from './styles'
import { useLocation } from 'react-router-dom';
import axios from "axios";

function FieldDetail() {
    const classes = useStyles()

    const location = useLocation();
    const item = location.state?.item;
    const [appointments,setAppointments]= useState([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000//get_appointments_by_sport_hall/19/').then((response) => {
          setAppointments(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error);
        }
        );
    
      }, []); 

  return (
    <div className={classes.container}>
        <div className={classes.userProfileInfo}>
            <SideBarComp/>
        </div>
        <div className={classes.fieldDetails}>
            <div><AboutField item={item}/></div>
            <div className={classes.reserveFieldContainer}>
                
                <div className={classes.time}>
                    <div className={classes.aboutFieldTitle}>Termini za Vistafon 05.06.</div>
                    <div className={classes.scrollViewCard}>
                        <UserFieldCard />
                        <UserFieldCard />
                        <UserFieldCard />
                        <UserFieldCard />
                        <UserFieldCard />
                        <UserFieldCard />
                    </div>
                    
                </div>
                <div className={classes.calendar}><EventsCalendar/></div>
            </div>
        </div>
    </div>
  )
}

export default FieldDetail