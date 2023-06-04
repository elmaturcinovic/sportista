import React from 'react'
import SideBarComp from './SideBarComp';
import ProfileComp from './ProfileComp';

const UserProfile = () => {
    return (
        <div className="user-main-div">
            <SideBarComp/>
            <ProfileComp/>
        </div>
    );
}

export default UserProfile