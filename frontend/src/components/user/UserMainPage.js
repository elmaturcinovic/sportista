import React from "react";
import SideBarComp from "./SideBarComp";
import ProfileComp from "./ProfileComp";

import './user_main_page.css'

const UserMainPage = () => {
    return (
        <div className="user-main-div">
            <SideBarComp/>
            <ProfileComp/>
        </div>
    );
}

export default UserMainPage;