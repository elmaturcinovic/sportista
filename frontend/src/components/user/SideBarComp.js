import React from "react";
import {useHistory} from "react-router-dom/cjs/react-router-dom";


const SideBarComp = () => {

    const field = {
        username: "elma.turcinovic"
    }


    const history = useHistory();
    const handleData = () => {
        history.push('/profil');
    };
    const handleScheduled = () => {
        history.push('/rezervirani-termini');
    };

    return (
        <div className="side-bar-div">
            <div className="image-username">
                <img src={require("./test-profile-image.jpg")} alt="Slika profila" id="profile-image"/>
                <p className="username">{field.username}</p>
            </div>
            <div className="user-buttons">
                <button className="user-button" onClick={handleData}>Moj profil</button>
                <button className="user-button" onClick={handleScheduled}>Rezervirani termini</button>
                <button className="user-button third">Odjava</button>
            </div>
            <img src={'logo.png'} alt="logo" id="user-logo-image"/>
        </div>
    );
}

export default SideBarComp;