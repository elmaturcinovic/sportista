import React from 'react';
import Navigation_Bar from "./NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselComp from "./Carousel";


function MainPage() {
    return (
        <div className="main-page">
            <Navigation_Bar/>
            <CarouselComp/>
        </div>
    );
}

export default MainPage;