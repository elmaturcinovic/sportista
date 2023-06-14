import React, { useState } from "react";
import {useHistory } from "react-router-dom/cjs/react-router-dom";


const SideBarComp = () => {

    //usestate staviti na 0, radi prikaza stavljeno na 3
    const [notificationCount, setNotificationCount] = useState(3); 

    const name = sessionStorage.getItem("name")
    const lastname = sessionStorage.getItem("lastname")
    const username = sessionStorage.getItem("username")
    const email = sessionStorage.getItem("email")
    const photo = sessionStorage.getItem("image")


    const field = {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        photo: photo
    }

    const history = useHistory();
    const handleProfileClick = () => {
        history.push('/profil');
    };
    const handleReservedClick = () => {
        history.push('/rezervirani-termini');
    };
    const handleNotificationsClick = () => {
        history.push('/moje-obavijesti');
    };
    
    const handleHomepageClick = () => {
        history.push('/');
    };
    
    const logout = () => {
        sessionStorage.setItem('id', '');
        sessionStorage.setItem('type', '');
        sessionStorage.setItem('username', '');
        console.log(sessionStorage.getItem('id'))
        console.log(sessionStorage.getItem('tip'))
        window.location.href='/';
    }
    
    return (
        <div className="side-bar-div">
            <div className="image-username">
                <img src={`http://localhost:8000${field.photo}`} alt="Slika profila" id="profile-image"/>
                <p className="username">{field.username}</p>
            </div>
            <div className="user-buttons">
                <button className="menu-button" onClick={handleHomepageClick}>Početna</button>
                <button className="menu-button" onClick={handleProfileClick}>Moj profil</button>
                <button className="menu-button" onClick={handleReservedClick}>Rezervirani termini</button>
                <button className="menu-button" id="notif" onClick={handleNotificationsClick}>Obavijesti
                    {notificationCount > 0 && <span className="notification-badge">{notificationCount}</span>}
                </button>
                <button className="menu-button" onClick={logout}>Odjavi se</button>
            </div>
            <img src={'logo.png'} alt="logo" id="user-logo-image"/>
        </div>
    );
}

export default SideBarComp;