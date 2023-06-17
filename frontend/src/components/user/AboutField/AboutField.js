import React from 'react'
import useStyles from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendar, faEnvelope, faClock, faPhone , faHome, faLocationDot, faSportsball} from '@fortawesome/free-solid-svg-icons';
import { MdOutlineSportsSoccer } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';


const AboutField = ({ item }) => {
    const classes = useStyles()
    const [sportNames, setSportNames] = useState([]);
    const [workDays, setWorkDays] = useState([]);


    const { name, photo, address, city, email, phone_number, sports, work_time_begin, work_time_end, working_days } = item;

    function fetchSportNames(sportIds) {
        console.log(sportIds)
        axios
        .get(`http://127.0.0.1:8000/get_sport_names_selected/`, {
            params: { sportIds: sportIds },
        })
        .then((response) => {
            setSportNames(response.data);
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchSportNames(sports);
      }, [sports]);
    
    const formatWorkTime = (time) => {
        if (!time) {
          return '';
        }
        const [hours, minutes, _] = time.split(':');
        return `${hours}:${minutes}`;
    };

    function fetchDayNames(dayIds) {
        axios
        .get(`http://127.0.0.1:8000/get_day_names_selected/`, {
            params: { dayIds: dayIds },
        })
        .then((response) => {
            setWorkDays(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        fetchDayNames(working_days);
      }, [working_days]);

    

  return (
    <div className={classes.container}>
        <div className={classes.aboutFieldContentContainer}>
            <div className={classes.aboutFieldImageContainer}>
               <div className={classes.aboutFieldImageContainerSize} style={{margin : '0px',width: '100%', height: '100%'}}> 
                    <img src={`http://localhost:8000${photo}`} alt="cover" className={classes.aboutFieldImage}  style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
               </div>
            </div>
            <div className={classes.aboutFieldTextContainer}>

                <div className={classes.aboutFieldIcon}>
                    <span className={classes.insideTextTitle}>{name}</span>
                </div>
                <div className={classes.aboutFieldIcon}>
                    <span className={classes.insideText}><FontAwesomeIcon icon={faClock} /> &nbsp;&nbsp; {formatWorkTime(work_time_begin)}-{formatWorkTime(work_time_end)}</span>
                </div>
                <div className={classes.aboutFieldIcon}>
                    <span className={classes.insideText}><FontAwesomeIcon icon={faCalendar} /> &nbsp;&nbsp; {workDays.map((day) => day).join(', ')}</span>
                </div>
                <div className={classes.aboutFieldIcon}>
                    <span className={classes.insideText}><FontAwesomeIcon icon={faLocationDot} />&nbsp;&nbsp; {address}, {city}</span>
                </div>
                <div className={classes.aboutFieldIcon}>
                    <span className={classes.insideText}><FontAwesomeIcon icon={faEnvelope} /> &nbsp;&nbsp; {email}</span>
                </div>
                <div className={classes.aboutFieldIcon}>
                    <span className={classes.insideText}><FontAwesomeIcon icon={faPhone} /> &nbsp;&nbsp; {phone_number}</span>
                </div>
                <div className={classes.aboutFieldIcon}>
                    <span className={classes.insideText}><MdOutlineSportsSoccer /> &nbsp;&nbsp;  {sportNames.map((sport) => sport).join(', ')}</span>
                </div>

            </div>
        </div>
        
    </div>

  )
}

export default AboutField