import React from "react";
import SideBarComp from "./SideBarComp";
import ScheduledComp from "./ScheduledComp";
import './styles_user.css'


const UserScheduledPage = () => {
    return (
        <div className="user-main-div">
            <SideBarComp/>
            <ScheduledComp/>
        </div>
    );
}

export default UserScheduledPage;