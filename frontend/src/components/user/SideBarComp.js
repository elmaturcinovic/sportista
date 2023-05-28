import React from "react";

const SideBarComp = () => {
    return (
        <div className="side-bar-div">
            <div className="image-username">
                <img src={require("./test-profile-image.jpg")} alt="Slika profila" id="profile-image"/>
                <p className="username">elma.turcinovic</p>
            </div>
            <div className="user-buttons">
                <button className="user-button">Moj profil</button>
                <button className="user-button">Rezervirani termini</button>
                <button className="user-button third">Odjava</button>
            </div>
            <img src={'logo.png'} alt="logo" id="user-logo-image"/>
        </div>
    );
}

export default SideBarComp;