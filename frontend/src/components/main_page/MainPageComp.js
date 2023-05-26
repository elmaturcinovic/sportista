import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import ToggleSideBarComp from "./ToggleSideBarComp";
import CardsComp from "./CardsComp";
import './main_page.css'


function MainPageComp() {
    return (
        <div className="main-page">
            <div className="side-bar">
                <ToggleSideBarComp/>
            </div>
            <div className="cards">
                <CardsComp/>
                <CardsComp/>
                <CardsComp/>
                <CardsComp/>
                <CardsComp/>
                <CardsComp/>
                <CardsComp/>
                <CardsComp/>
                <CardsComp/>
            </div>
        </div>
    );
}

export default MainPageComp;