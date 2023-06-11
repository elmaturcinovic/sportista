import React from "react";
import SideBarComp from "./SideBarComp";
import './styles_user.css'
import ReservedAppointmentsComp from "./ReservedAppointmentsComp";


const UserReservedPage = () => {
    return (
        <div className="user-main-div">
            <SideBarComp/>
            <ReservedAppointmentsComp/>
        </div>
    );
}

export default UserReservedPage;