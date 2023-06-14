import React from "react";
import SideBarComp from "./SideBarComp";
import './styles_user.css'
import NotificationsComp from "./NotificationsComp";




const UserNotificationsPage = () => {
    return (
        <div className="user-main-div">
            <SideBarComp/>
            <NotificationsComp/>
        </div>
    );
}

export default UserNotificationsPage;