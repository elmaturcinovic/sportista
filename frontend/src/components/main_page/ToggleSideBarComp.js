import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import './toggle_side_bar.css';
import HamburgerIconComp from "./HamburgerIconComp";


const ToggleSideBarComp = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sliding-sidebar ${isOpen ? 'open' : ''}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                <HamburgerIconComp/>
            </button>
            <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link href="/pocetna">Početna stranica</Nav.Link>
                <Nav.Link href="/profil">Moj profil</Nav.Link>
                <Nav.Link href="/o_nama">O nama</Nav.Link>
                <Nav.Link href="/kontakt">Kontaktirajte nas</Nav.Link>
            </Nav>
            <img src="logo.png" alt="logo" className="img-logo"></img>
        </div>
    );
};

export default ToggleSideBarComp;
