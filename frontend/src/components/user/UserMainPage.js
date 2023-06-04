import React from "react";
import SideBarComp from "./SideBarComp";
import './styles_user.css'
import ScheduledComp from "./ScheduledComp";

const UserMainPage = () => {
    return (
        <div className="user-main-div">
            <SideBarComp/>
            <ScheduledComp/>
        </div>
    );
}

export default UserMainPage;