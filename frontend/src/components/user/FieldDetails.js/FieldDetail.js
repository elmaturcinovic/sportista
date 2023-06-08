import React from 'react'
import EventsCalendar from '../../Companies/EventsCalendar/EventsCalendar'
import AboutField from '../../shared/AboutField/AboutField'
import ProfileComp from '../ProfileComp'
import SideBarComp from '../SideBarComp'
import UserMainPage from '../UserMainPage'
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
                <div className={classes.time}>
                </div>
                <div className={classes.calendar}><EventsCalendar/></div>
            </div>
        </div>
    </div>
  )
}

export default FieldDetail