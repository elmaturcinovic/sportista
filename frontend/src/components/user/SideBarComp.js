import React from "react";
import {useHistory} from "react-router-dom/cjs/react-router-dom";


const SideBarComp = () => {

    const field = {
        username: "elma.turcinovic"
    }

    const history = useHistory();
    const handleProfileClick = () => {
        history.push('/profil');
    };
    const handleReservedClick = () => {
        history.push('/rezervirani-termini');
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
                <img src={require("./test-profile-image.jpg")} alt="Slika profila" id="profile-image"/>
                <p className="username">{field.username}</p>
            </div>
            <div className="user-buttons">
                <button className="user-button" onClick={handleHomepageClick}>Početna</button>
                <button className="user-button" onClick={handleProfileClick}>Moj profil</button>
                <button className="user-button" onClick={handleReservedClick}>Rezervirani termini</button>
                <button className="user-button" onClick={logout}>Odjavi se</button>
            </div>
            <img src={'logo.png'} alt="logo" id="user-logo-image"/>
        </div>
    );
}

export default SideBarComp;