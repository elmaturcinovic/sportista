import React from 'react'
import EventsCalendar from '../../Companies/EventsCalendar/EventsCalendar'
import AboutField from '../../shared/AboutField/AboutField'
import SideBarComp from '../SideBarComp'
import UserFieldCard from '../UserFieldCard'
import useStyles from './styles'

function FieldDetail() {
    const classes = useStyles()
  return (
    <div className={classes.container}>
        <div className={classes.userProfileInfo}>
            <SideBarComp/>
        </div>
        <div className={classes.fieldDetails}>
            <div><AboutField/></div>
            <div className={classes.reserveFieldContainer}>
                <div className={classes.calendar}><EventsCalendar/></div>
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
            </div>
        </div>
    </div>
  )
}

export default FieldDetail