import React from "react";
import DropDownComp from "./DropDownComp";
import DateSmallComp from "./DateSmallComp";
import CardComp from "./CardComp";

const ScheduledComp = () => {
    return(
        <div className="schedule-main-div">
            <div className="schedule-first-div">
                <h2 id="heading-h2">Sportski tereni/dvorane</h2>
                <DropDownComp label="Sport:" selected={"sport"} option1={"Fudbal"} option2={"Košarka"} option3={"Odbojka"} option4={"Tenis"}/>
                <DropDownComp label="Grad:" selected={"grad"} option1={"Sarajevo"} option2={"Mostar"} option3={"Banja Luka"} option4={"Tuzla"}/>
                <DateSmallComp label={"Datum:"} date={"datum"}/>
            </div>
            <div className="schedule-second-div">
                <CardComp/>
            </div>
        </div>
    );
}

export default ScheduledComp;